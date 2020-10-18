'use strict'

/** @typedef {import('@adonisjs/framework/src/Request')} Request */
/** @typedef {import('@adonisjs/framework/src/Response')} Response */
/** @typedef {import('@adonisjs/framework/src/View')} View */

/**
 * Resourceful controller for interacting with restrictgroups
 */

const SiteGroup = use('App/Models/SiteGroup');
const { validate } = use("Validator");
const {HttpException} = require('node-exceptions') ;

class RestrictGroupController {
  /**
   * Show a list of all restrictgroups.
   * GET restrictgroups
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async index ({ request, response, view }) {
    const siteGroups = await SiteGroup.all()
    return {
      status: 'success',
      data: response.ok(siteGroups.toJSON())
    };
  }

  /**
   * Render a form to be used for creating a new restrictgroup.
   * GET restrictgroups/create
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async create ({ request, response, view }) {
  }

  /**
   * Create/save a new restrictgroup.
   * POST restrictgroups
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async store ({ request, response }) {
    let data = request.only(['site_id' , 'group_id'])
    const validation = await validate(data, SiteGroup.getCreateRule())
    if (validation.fails()) {
      return response.notAcceptable({
        status: 'Failed',
        message: validation.messages()
      });
    }
    let siteGroup = await SiteGroup.create(data);
    return response.ok({
      status: true,
      data: siteGroup.toJSON(),
    })
  }

  /**
   * Display a single restrictgroup.
   * GET restrictgroups/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async show ({ params, request, response, view }) {
  }

  /**
   * Render a form to update an existing restrictgroup.
   * GET restrictgroups/:id/edit
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async edit ({ params, request, response, view }) {
  }

  /**
   * Update restrictgroup details.
   * PUT or PATCH restrictgroups/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async update ({ params, request, response }) {
  }

  /**
   * Delete a restrictgroup with id.
   * DELETE restrictgroups/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async destroy ({ params, request, response }) {
    const siteGroup = await SiteGroup.find( params.id )

    if (!siteGroup) {
      throw new HttpException("Restrict Not Found" , 404) ;
    }

    await siteGroup.delete()

    return response.ok( {
      status: 'Success',
      message: 'Restrict deleted!!!'
    } )
  }
}

module.exports = RestrictGroupController
