'use strict'
function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}
class Test2Job {
  // If this getter isn't provided, it will default to 1.
  // Increase this number to increase processing concurrency.
  static get concurrency () {
    return 2
  }

  // This is required. This is a unique key used to identify this job.
  static get key () {
    return 'Test2Job-job'
  }

  // This is where the work is done.
  async handle (data) {
    await console.log('Test2Job-job started')
    await sleep(20000)
    await console.log("here2")
  }
}

module.exports = Test2Job
