'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class SitesSchema extends Schema {
  up () {
    this.table('sites', (table) => {
      // alter table
      table.boolean('restrict_for_all').defaultTo(false)
    })
  }

  down () {
    this.table('sites', (table) => {
      // reverse alternations
    })
  }
}

module.exports = SitesSchema
