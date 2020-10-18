'use strict'

/*
|--------------------------------------------------------------------------
| ProductJSeeder
|--------------------------------------------------------------------------
|
| Make use of the Factory instance to seed database with dummy data or
| make use of Lucid models directly.
|
*/

/** @type {import('@adonisjs/lucid/src/Factory')} */
const Factory = use('Factory')
const Product = use('App/Models/Product') ;

class ProductSeeder {
  async run () {

    let product_categories = await Factory.model('App/Models/ProductCategory')
      .createMany(10) ;

    let products = await Factory.model('App/Models/Product')
      .createMany(10) ;


  }
}

module.exports = ProductSeeder
