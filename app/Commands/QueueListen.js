'use strict'

const {Command} = require('@adonisjs/ace');

class QueueListen extends Command {
  static get inject () {
    return [
      'Adonis/Addons/Queue'
    ]
  }

  constructor (Queue) {
    super();
    this.queue = Queue;
  }
  static get signature () {
    return 'queue:listen'
  }

  static get description () {
    return 'Start the queue listener.';
  }

  async handle (args, options) {
    return this.queue.listen();
  }
}

module.exports = QueueListen
