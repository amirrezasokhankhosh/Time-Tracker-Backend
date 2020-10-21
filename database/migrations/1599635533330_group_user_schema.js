'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class GroupUserSchema extends Schema {
  up () {
    this.create('group_user', (table) => {
      table.increments()
      table.timestamps()
      table.integer('user_id').unsigned().index();
      table.foreign('user_id').references('id').on('users').onDelete('cascade') ;
      table.integer('group_id').unsigned().index() ;
      table.foreign('group_id').references('id').on('groups').onDelete('cascade') ;
    })
  }

  down () {
    this.drop('group_user')
  }
}

module.exports = GroupUserSchema
