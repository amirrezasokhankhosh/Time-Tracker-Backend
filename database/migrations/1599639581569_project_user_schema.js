'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class ProjectUserSchema extends Schema {
  up () {
    this.create('project_user', (table) => {
      table.increments()
      table.timestamps()
      table.integer('user_id').unsigned().index();
      table.foreign('user_id').references('id').on('users').onDelete('cascade') ;
      table.integer('project_id').unsigned().index() ;
      table.foreign('project_id').references('id').on('projects').onDelete('cascade') ;
    })
  }

  down () {
    this.drop('project_user')
  }
}

module.exports = ProjectUserSchema
