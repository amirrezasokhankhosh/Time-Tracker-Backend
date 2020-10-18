'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class ProjectsSchema extends Schema {
  up () {
    this.create('projects', (table) => {
      table.increments()
      table.timestamps()
      table.string('name') ;
      table.string('description') ;
    })
  }

  down () {
    this.drop('projects')
  }
}

module.exports = ProjectsSchema
