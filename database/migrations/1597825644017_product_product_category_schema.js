'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class ProductProductCategorySchema extends Schema {
  up () {
    this.create('product_product_category', (table) => {
      table.integer('product_id').unsigned().index() ;
      table.foreign('product_id').references('id').on('products').onDelete('SET NULL') ;
      table.integer('product_category_id').unsigned().index() ;
      table.foreign('product_category_id').references('id').on('product_categories').onDelete('SET NULL') ;
    })
  }

  down () {
    this.drop('product_product_category')
  }
}

module.exports = ProductProductCategorySchema
