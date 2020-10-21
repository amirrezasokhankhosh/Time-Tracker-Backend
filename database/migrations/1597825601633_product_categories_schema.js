'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class ProductCategoriesSchema extends Schema {
  up () {
    this.create('product_categories', (table) => {
      table.increments() ;
      table.timestamps() ;
      table.string('name') ;
      table.string('description') ;
    })
  }

  down () {
    this.drop('product_categories')
  }
}

module.exports = ProductCategoriesSchema
