'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use( 'Schema' )

class LogsSchema extends Schema {
  up (){
    this.create( 'logs', (table) => {
      table.increments();
      table.string( 'description' ).nullable();
      table.integer( 'error_level' ).notNullable();
      table.timestamps();
    } )
  }

  down (){
    this.drop( 'logs' )
  }
}

module.exports = LogsSchema
