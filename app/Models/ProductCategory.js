'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')

class ProductCategory extends Model {

  static getCreateRule() {
    return {
      name: 'required|max:30' ,
      description: 'max:200' ,
    }
  }


  static getUpdateRule() {
    return {
      name: 'required|max:30' ,
      description: 'max:200' ,
    }
  }
}

module.exports = ProductCategory
