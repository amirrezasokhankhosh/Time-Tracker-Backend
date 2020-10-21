'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class SiteUsersSchema extends Schema {
  up () {
    this.create('site_users', (table) => {
      table.increments()
      table.integer('user_id').unsigned().index() ;
      table.foreign('user_id').references('id').on('users').onDelete('cascade') ;
      table.integer('site_id').unsigned().index() ;
      table.foreign('site_id').references('id').on('sites').onDelete('cascade') ;
      table.timestamps()
    })
  }

  down () {
    this.drop('site_users')
  }
}

module.exports = SiteUsersSchema
