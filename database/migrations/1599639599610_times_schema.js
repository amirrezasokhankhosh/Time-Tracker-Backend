'use strict'

const { time } = require('faker')

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class TimesSchema extends Schema {
  up () {
    this.create('times', (table) => {
      table.increments()
      table.date('day');
      table.time('start_at') ;
      table.time('end_at') ;
      table.integer('user_id').unsigned().index() ;
      table.foreign('user_id').references('id').on('users').onDelete('cascade') ;
      table.integer('task_id').unsigned().index() ;
      table.foreign('task_id').references('id').on('tasks').onDelete('cascade') ;
    })
  }

  down () {
    this.drop('times')
  }
}

module.exports = TimesSchema
