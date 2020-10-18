'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class UnproductiveSchema extends Schema {
  up() {
    this.create('unproductives', (table) => {
      table.increments()
      table.integer('user_id').unsigned().index();
      table.foreign('user_id').references('id').on('users').onDelete('cascade');
      table.integer('site_id').unsigned().index();
      table.foreign('site_id').references('id').on('sites').onDelete('cascade');
      table.datetime('start_at');
      table.datetime('end_at');
      table.timestamps()
    })
  }

  down() {
    this.drop('unproductives')
  }
}

module.exports = UnproductiveSchema
