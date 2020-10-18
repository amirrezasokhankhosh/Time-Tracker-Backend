'use strict'

/** @typedef {import('@adonisjs/framework/src/Request')} Request */
/** @typedef {import('@adonisjs/framework/src/Response')} Response */
/** @typedef {import('@adonisjs/framework/src/View')} View */
const ProductCategory = use('App/Models/ProductCategory') ;
const { validate } = use( 'Validator') ;

/**
 * Resourceful controller for interacting with productcategories
 */
class ProductCategoryController {
  /**
   * Show a list of all productcategories.
   * GET productcategories
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async index ({ request, response, view }) {

    let page = request.input('page') || 1 ;
    let product_categories ;

    if (request.input('all')) {
      product_categories = await ProductCategory.query().fetch() ;
    } else {
      product_categories = await ProductCategory.query()
        .orderBy('created_at' , 'desc').paginate(page , 6) ;
    }

    return response.status(200).json({
      status: true ,
      data: product_categories.toJSON()
    })
  }


  /**
   * Create/save a new productcategory.
   * POST productcategories
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async store ({ request, response }) {

    let data = request.only(['name' , 'description']) ;

    const validation = await validate(data,  ProductCategory.getCreateRule());
    if (validation.fails()) {
      return response.notAcceptable({
        status: 'Failed',
        message: validation.messages()
      });
    }

    let product_category = await ProductCategory.create(data) ;

    return response.ok({
      status: true ,
      data: product_category.toJSON() ,
    })
  }

  /**
   * Display a single productcategory.
   * GET productcategories/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async show ({ params, request, response, view }) {

    let product_category = await ProductCategory.findOrFail(params.id) ;

    return response.ok({
      status: true ,
      data: product_category.toJSON() ,
    })

  }


  /**
   * Update productcategory details.
   * PUT or PATCH productcategories/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async update ({ params, request, response }) {

    let data = request.only(['name' , 'description']) ;

    const validation = await validate(data,  ProductCategory.getUpdateRule());
    if (validation.fails()) {
      return response.notAcceptable({
        status: 'Failed',
        message: validation.messages()
      });
    }

    let product_category = await ProductCategory.findOrFail(params.id) ;
    await ProductCategory.query().where('id' ,params.id).update(data) ;

    return response.ok({
      status: true ,
      data: 'updated successfully' ,
    })
  }

  /**
   * Delete a productcategory with id.
   * DELETE productcategories/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async destroy ({ params, request, response }) {

    let product_category = await ProductCategory.findOrFail(params.id) ;
    await product_category.delete() ;

    return response.ok({
      status: true ,
      data: 'Product Category Deleted' ,
    }) ;
  }
}

module.exports = ProductCategoryController
