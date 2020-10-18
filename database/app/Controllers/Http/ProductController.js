'use strict'

/** @typedef {import('@adonisjs/framework/src/Request')} Request */
/** @typedef {import('@adonisjs/framework/src/Response')} Response */
/** @typedef {import('@adonisjs/framework/src/View')} View */
const Product = use('App/Models/Product') ;
const { validate } = use( 'Validator') ;


/**
 * Resourceful controller for interacting with products
 */
class ProductController {
  /**
   * Show a list of all products.
   * GET products
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async index ({ request, response, view }) {

    let page = request.input('page') || 1 ;
    let products = await Product.query().with('productCategories')
      .orderBy('updated_at' , 'desc')
      .paginate(page , 7) ;

    return response.status(200).json({
      status: true ,
      data: products.toJSON()
    })
  }


  /**
   * Create/save a new product.
   * POST products
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async store ({ request, response }) {

    let data = request.only(['name' , 'content' , 'image' , 'code' , 'available' ,
      'max_available' , 'price']) ;

    const validation = await validate(data,  Product.getCreateRule());
    if (validation.fails()) {
      return response.notAcceptable({
        status: 'Failed',
        message: validation.messages()
      });
    }

    let product = await Product.create(data) ;

    // add categories if exists
    if (request.input('product_categories')) {
      let product_categories = request.input('product_categories') ;
      await product.productCategories().sync(product_categories) ;
    }

    return response.ok({
      status: true ,
      data: product.toJSON() ,
    })
  }

  /**
   * Display a single product.
   * GET products/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async show ({ params, request, response, view }) {

    let product = await Product.findOrFail(params.id) ;

    return response.status(200).json({
      status: true ,
      data: product.toJSON()
    })
  }


  /**
   * Update product details.
   * PUT or PATCH products/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async update ({ params, request, response }) {


    let data = request.only(['name' , 'content' , 'image' , 'code' , 'available' ,
      'max_available' , 'price']) ;

    const validation = await validate(data,  Product.getEditRule());
    if (validation.fails()) {
      return response.notAcceptable({
        status: 'Failed',
        message: validation.messages()
      });
    }

    await Product.query().where('id' ,params.id).update(data) ;

    // add categories if exists
    if (request.input('product_categories')) {
      let product_categories = request.input('product_categories') ;
      let product = await Product.query().where('id' , params.id).firstOrFail() ;
      await product.productCategories().sync(product_categories) ;
    }

    return response.ok({
      status: true ,
      data: 'Updated Successfully'
    })
  }

  /**
   * Delete a product with id.
   * DELETE products/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async destroy ({ params, request, response }) {

    let product = await Product.query().where('id' , params.id).firstOrFail() ;
    await product.delete() ;

    return response.status(200).json({
      status: true ,
      data: 'product deleted' ,
    })
  }
}

module.exports = ProductController
