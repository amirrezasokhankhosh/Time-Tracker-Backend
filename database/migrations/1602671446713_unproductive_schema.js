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
      table.time('start_at');
      table.time('end_at');
      table.date('day');
      table.timestamps()
    })
  }

  down() {
    this.drop('unproductives')
  }
}

module.exports = UnproductiveSchema
