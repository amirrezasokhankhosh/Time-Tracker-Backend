'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class TasksSchema extends Schema {
  up () {
    this.create('tasks', (table) => {
      table.increments()
      table.timestamps()
      table.string('title') ;
      table.text('content') ;
      table.integer('project_id').unsigned().index() ;
      table.foreign('project_id').references('id').on('projects').onDelete('cascade') ;
    })
  }

  down () {
    this.drop('tasks')
  }
}

module.exports = TasksSchema
