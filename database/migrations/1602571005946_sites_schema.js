'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class SitesSchema extends Schema {
  up () {
    this.create('sites', (table) => {
      table.increments()
      table.string('url')
      table.string('description')
      table.boolean('restrict_for_all').defaultTo(false)
      table.timestamps()
    })
  }

  down () {
    this.drop('sites')
  }
}

module.exports = SitesSchema
