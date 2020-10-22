'use strict'

/** @typedef {import('@adonisjs/framework/src/Request')} Request */
/** @typedef {import('@adonisjs/framework/src/Response')} Response */
/** @typedef {import('@adonisjs/framework/src/View')} View */

/**
 * Resourceful controller for interacting with restrictusers
 */

const SiteUser = use('App/Models/SiteUser');
const { validate } = use("Validator");
const { HttpException } = require('node-exceptions');

class RestrictUserController {
  /**
   * Show a list of all restrictusers.
   * GET restrictusers
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async index({ request, response, view }) {
    const siteUsers = await SiteUser.all()
    return {
      status: 'success',
      data: response.ok(siteUsers.toJSON())
    };
  }

  /**
   * Render a form to be used for creating a new restrictuser.
   * GET restrictusers/create
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async create({ request, response, view }) {

  }

  /**
   * Create/save a new restrictuser.
   * POST restrictusers
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async store({ request, response }) {
    let data = request.only(['site_id', 'user_id'])
    const validation = await validate(data, SiteUser.getCreateRule())
    if (validation.fails()) {
      return response.notAcceptable({
        status: 'Failed',
        message: validation.messages()
      });
    }
    let siteUser = await SiteUser.create(data);
    return response.ok({
      status: true,
      data: siteUser.toJSON(),
    })
  }

  /**
   * Display a single restrictuser.
   * GET restrictusers/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async show({ params, request, response, view }) {
  }

  /**
   * Render a form to update an existing restrictuser.
   * GET restrictusers/:id/edit
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async edit({ params, request, response, view }) {
  }

  /**
   * Update restrictuser details.
   * PUT or PATCH restrictusers/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async update({ params, request, response }) {
  }

  /**
   * Delete a restrictuser with id.
   * DELETE restrictusers/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async destroy({ params, request, response }) {
    const siteUser = await SiteUser.find(params.id)

    if (!siteUser) {
      throw new HttpException("Restrict Not Found", 404);
    }

    await siteUser.delete()

    return response.ok({
      status: 'Success',
      message: 'Restrict deleted!!!'
    })
  }

  async destroy2({ params, response }) {
    var siteUser = await SiteUser.query().where('site_id', params.site_id).where('user_id', params.user_id).fetch()
    siteUser = siteUser.toJSON()[0]
    console.log(siteUser)
    var siteUser_id = siteUser.id
    let siteUser2 = await SiteUser.find(siteUser_id)
    if (!siteUser2) {
      throw new HttpException("Restrict Not Found", 404);
    }

    await siteUser2.delete()

    return response.ok({
      status: 'Success',
      message: 'Restrict deleted!!!'
    })
  }
}

module.exports = RestrictUserController
