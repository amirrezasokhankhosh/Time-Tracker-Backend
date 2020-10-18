'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class SiteGroupsSchema extends Schema {
  up () {
    this.create('site_groups', (table) => {
      table.increments()
      table.integer('group_id').unsigned().index() ;
      table.foreign('group_id').references('id').on('groups').onDelete('cascade') ;
      table.integer('site_id').unsigned().index() ;
      table.foreign('site_id').references('id').on('sites').onDelete('cascade') ;
      table.timestamps()
    })
  }

  down () {
    this.drop('site_groups')
  }
}

module.exports = SiteGroupsSchema
