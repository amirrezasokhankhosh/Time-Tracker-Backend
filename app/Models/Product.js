'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')

class Product extends Model {


  productCategories() {
    return this
      .belongsToMany('App/Models/ProductCategory' ,
        'product_id' , 'product_category_id' , 'id' , 'id')
      .pivotTable('product_product_category')
  }


  static getCreateRule() {
    return {
      name: 'required|max:200' ,
      content: 'max:1000' ,
      image: 'max:200' ,
      code: 'max:200' ,
      available: 'integer' ,
      max_available: 'integer' ,
      price: 'required|number' ,
    }
  }


  static getEditRule() {
    return {
      name: 'required|max:200' ,
      content: 'max:1000' ,
      image: 'max:200' ,
      code: 'max:200' ,
      available: 'integer' ,
      max_available: 'integer' ,
      price: 'required|number' ,
    }
  }


}

module.exports = Product
