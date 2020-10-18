'use strict'

/** @typedef {import('@adonisjs/framework/src/Request')} Request */
/** @typedef {import('@adonisjs/framework/src/Response')} Response */
/** @typedef {import('@adonisjs/framework/src/View')} View */

/**
 * Resourceful controller for interacting with unproductives
 */

const Site = use('App/Models/Site')
const User = use('App/Models/User')
const Unproductive = use('App/Models/Unproductive')
const { validate } = use("Validator");
const { HttpException } = require('node-exceptions');

class UnproductiveController {
  /**
   * Show a list of all unproductives.
   * GET unproductives
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async index({ request, response, view }) {
    const unproductives = await Unproductive.all()
    return {
      status: 'success',
      data: response.ok(unproductives.toJSON())
    };
  }

  /**
   * Render a form to be used for creating a new unproductive.
   * GET unproductives/create
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async create({ request, response, view }) {
  }

  /**
   * Create/save a new unproductive.
   * POST unproductives
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async store({ request, response }) {
    let data = request.only(['site_id', 'user_id', 'start_at', 'end_at'])
    const validation = await validate(data, Unproductive.getCreateRule())
    if (validation.fails()) {
      return response.notAcceptable({
        status: 'Failed',
        message: validation.messages()
      });
    }

    var site = await Site.query().where('id', data.site_id).with('users').with('groups').fetch()
    var restrictedUsers = site.toJSON()[0].users
    var restrictedGroups = site.toJSON()[0].groups
    if(site.toJSON()[0].restrict_for_all){
      let unproductive = await Unproductive.create(data);
        return response.ok({
          status: true,
          data: unproductive.toJSON(),
        })
    }
    for (var i = 0; restrictedUsers[i]; i++) {
      if (restrictedUsers[i].id == data.user_id) {
        let unproductive = await Unproductive.create(data);
        return response.ok({
          status: true,
          data: unproductive.toJSON(),
        })
      }
    }
    var user = await User.query().where('id' , data.user_id).with('groups').fetch()
    var userGroups = user.toJSON()[0].groups
    for(var i = 0 ; userGroups[i] ; i++){
      for(var j = 0 ; restrictedGroups[j] ; j++){
        if(restrictedGroups[j].id == userGroups[i].id){
          let unproductive = await Unproductive.create(data);
          return response.ok({
            status: true,
            data: unproductive.toJSON(),
          })
        }
      }
    }
    return response.ok({
      status: true,
      message: 'This site is not restricted for this user.'
    })
  }

  /**
   * Display a single unproductive.
   * GET unproductives/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async show({ params, request, response, view }) {
  }

  /**
   * Render a form to update an existing unproductive.
   * GET unproductives/:id/edit
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async edit({ params, request, response, view }) {
  }

  /**
   * Update unproductive details.
   * PUT or PATCH unproductives/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async update({ params, request, response }) {
  }

  /**
   * Delete a unproductive with id.
   * DELETE unproductives/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async destroy({ params, request, response }) {
  }
}

module.exports = UnproductiveController
