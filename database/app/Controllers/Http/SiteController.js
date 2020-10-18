'use strict'

/** @typedef {import('@adonisjs/framework/src/Request')} Request */
/** @typedef {import('@adonisjs/framework/src/Response')} Response */
/** @typedef {import('@adonisjs/framework/src/View')} View */

/**
 * Resourceful controller for interacting with sites
 */

const Site = use('App/Models/Site');
const { validate } = use("Validator");
const {HttpException} = require('node-exceptions') ;

class SiteController {
  /**
   * Show a list of all sites.
   * GET sites
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async index({ request, response, view }) {
    const sites = await Site.all()
    return {
      status: 'success',
      data: response.ok(sites.toJSON())
    };
  }

  /**
   * Render a form to be used for creating a new site.
   * GET sites/create
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async create({ request, response, view }) {
  }

  /**
   * Create/save a new site.
   * POST sites
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async store({ request, response }) {
    let data = request.only(['url', 'description' , 'restrict_for_all'])
    const validation = await validate(data, Site.getCreateRule())
    if (validation.fails()) {
      return response.notAcceptable({
        status: 'Failed',
        message: validation.messages()
      });
    }
    let site = await Site.create(data);
    return response.ok({
      status: true,
      data: site.toJSON(),
    })
  }

  /**
   * Display a single site.
   * GET sites/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async show({ params, request, response, view }) {
  }

  /**
   * Render a form to update an existing site.
   * GET sites/:id/edit
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async edit({ params, request, response, view }) {
  }

  /**
   * Update site details.
   * PUT or PATCH sites/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async update({ params, request, response }) {
  }

  /**
   * Delete a site with id.
   * DELETE sites/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async destroy({ params, request, response }) {
    const site = await Site.find( params.id )

    if (!site) {
      throw new HttpException("Site Not Found" , 404) ;
    }

    await site.delete()

    return response.ok( {
      status: 'Success',
      message: 'Site deleted!!!'
    } )
  }
}

module.exports = SiteController
