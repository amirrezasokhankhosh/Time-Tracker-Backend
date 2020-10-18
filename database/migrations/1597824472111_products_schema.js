'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class ProductsSchema extends Schema {
  up () {
    this.create('products', (table) => {
      table.increments() ;
      table.timestamps() ;
      table.string('name', 200).notNullable() ;
      table.text('content') ;
      table.string('image' , 200) ;
      table.string('code') ;
      table.decimal('price' , 64) ;
      table.integer('available') ;
      table.integer('max_available') ;
    })
  }

  down () {
    this.drop('products')
  }
}

module.exports = ProductsSchema
