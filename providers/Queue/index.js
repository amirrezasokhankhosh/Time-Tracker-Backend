'use strict'

const Bull = require('bull');
const {Ioc} = require('@adonisjs/fold');
const co = require('co');
const Logger = use('Logger');
const path = require('path');
const fs = require('fs');
const Helpers = use('Helpers');

class Queue {
    constructor(Config = {}) {
        this.Config = Config;
        this.jobsPath = path.join(Helpers.appRoot('app'), 'Jobs');
        this.jobsPath = path.normalize(this.jobsPath);
        this._queuesPool = {};
        this.registeredJobs = [];
    }

    get(key = 'default') {
        /**
         * If there is an instance of queue already, then return it
         */
        if (this._queuesPool[key]) {
            return this._queuesPool[key]
        }

        /**
         * Read configuration using Config
         * provider
         */
        const config = this.getQueueConfig(key);

        /**
         * Create a new queue instance and save it's
         * reference
         */
        this._queuesPool[key] = new Bull(key, config, {});

        /**
         * Return the instance back
         */
        return this._queuesPool[key]
    }

    /**
     * get queue config
     *
     * @param name
     * @returns {*}
     */
    getQueueConfig(name) {
        let config = this.Config.get(`queue.stores.${name}`);
        let queueConfig = null;
        if (config.driver === 'redis') {
            queueConfig = this.resolveRedisConfig(config.connection);
        }
        return queueConfig;
    }

    /**
     * resolve redis config
     *
     * @param connection
     * @returns {*}
     */
    resolveRedisConfig(connection) {
        return this.Config.get(`redis.${connection}`);
    }

    /**
     * Dispatch a new job.
     *
     * @public
     */
    dispatch(key, data) {
        if (typeof key !== 'string') {
            throw new Error(`Expected job key to be of type string but got <${typeof key}>.`);
        }
        return this.get(key).add(data);
    }

    /**
     * Start queue to process all jobs defined in app/Jobs
     *
     * @public
     */
    listen() {
        try {
            const jobFiles = fs.readdirSync(this.jobsPath);
            jobFiles.forEach(file => {
                const filePath = path.join(this.jobsPath, file);
                try {
                    const Job = require(filePath);

                    // Get instance of job class
                    const jobInstance = Ioc.make(Job);

                    // Every job must expose a key
                    if (!Job.key) {
                        throw new Error(`No key found for job: ${filePath}`);
                    }

                    // If job concurrency is not set, default to 1
                    if (Job.concurrency === undefined) {
                        Job.concurrency = 1;
                    }

                    // If job concurrecny is set to an invalid value, throw error
                    if (typeof Job.concurrency !== 'number') {
                        throw new Error(`Job concurrency value must be a number but instead it is: <${Job.concurrency}>`);
                    }

                    // Every job must expose a handle function
                    if (!jobInstance.handle) {
                        throw new Error(`No handler found for job: ${filePath}`);
                    }

                    // Track currently registered jobs in memory
                    this.registeredJobs.push(Job);

                    // Register job handler
                    this.get(Job.key).process(Job.concurrency, function (job, done) {
                        co(jobInstance.handle.bind(jobInstance), job.data).then(() => {
                            done()
                        });
                    });

                } catch (e) {
                    // If this file is not a valid javascript class, print warning and return
                    if (e instanceof ReferenceError) {
                        Logger.warn('Unable to import job class <%s>. Is it a valid javascript class?', file);
                        return;
                    } else {
                        Logger.error(e);
                        throw e;
                    }
                }
            });
            Logger.info('queue worker listening for %d jobs', this.registeredJobs.length);
        } catch (e) {
            // If the directory isn't found, log a message and exit gracefully
            if (e.code === 'ENOENT') {
                Logger.info('The jobs directory <%s> does not exist. Exiting.', this.jobsPath);
            } else {
                // If it's some other error, bubble up exception
                Logger.error(e);
                throw e;
            }
        }
    }
}

module.exports = Queue;