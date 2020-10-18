'use strict'

/** @type {import('@adonisjs/framework/src/Env')} */
const Env = use('Env');

module.exports = {
    queues: {
        default: {
            driver: 'redis',
            connection: 'local'
        }
    }
};