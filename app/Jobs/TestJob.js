'use strict'
const axios = require('axios')
function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}
class TestJob {
  // If this getter isn't provided, it will default to 1.
  // Increase this number to increase processing concurrency.
  static get concurrency () {
    return 3
  }

  // This is required. This is a unique key used to identify this job.
  static get key () {
    return 'TestJob-job'
  }

  // This is where the work is done.
  async handle (data) {
      await axios.get("http://google.com")
      await console.log("Hello from google")
      await sleep(20000)
    console.log("here")
  }
  onCompleted(job, result){
    console.log("Job under progress")
  }
  onActive(job, jobPromis){
    console.log("Job Under Progress")
  }
  onProgress(job, progress){
    console.log(job)
    console.log(progress)
  }
}

module.exports = TestJob
