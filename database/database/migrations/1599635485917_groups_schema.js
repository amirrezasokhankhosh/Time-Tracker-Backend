'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class GroupsSchema extends Schema {
  up () {
    this.create('groups', (table) => {
      table.increments()
      table.timestamps()
      table.string('name') ;
      table.string('description') ;
    })
  }

  down () {
    this.drop('groups')
  }
}

module.exports = GroupsSchema
