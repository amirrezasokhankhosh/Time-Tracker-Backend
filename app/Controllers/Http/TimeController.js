'use strict'

/** @typedef {import('@adonisjs/framework/src/Request')} Request */
/** @typedef {import('@adonisjs/framework/src/Response')} Response */
/** @typedef {import('@adonisjs/framework/src/View')} View */

/**
 * Resourceful controller for interacting with times
 */

const Time = use('App/Models/Time');
const { validate } = use("Validator");
const { HttpException } = require('node-exceptions');
class TimeController {
  /**
   * Show a list of all times.
   * GET times
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async index({ request, response, view }) {
    const times = await Time.all()
    return {
      status: 'success',
      data: response.ok(times.toJSON())
    };
  }

  /**
   * Render a form to be used for creating a new time.
   * GET times/create
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async create({ request, response, view }) {
  }

  /**
   * Create/save a new time.
   * POST times
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async store({ request, response, auth }) {
    const user = await auth.getUser()
    let data = request.only(['day', 'start_at', 'end_at', 'task_id'])
    data['user_id'] = user.toJSON().id
    const validation = await validate(data, Time.getCreateRule())
    if (validation.fails()) {
      return response.notAcceptable({
        status: 'Failed',
        message: validation.messages()
      });
    }
    let time = await Time.create(data);
    return response.ok({
      status: true,
      data: time.toJSON(),
    })
  }

  /**
   * Display a single time.
   * GET times/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async show({ params, request, response, view }) {
    const time = await Time.find( params.id )

    if (!time) {
      throw new HttpException("Time Not Found" , 404) ;
    }

    return response.ok( {
      status: 'Success',
      data: time.toJSON()
    } )
  }

  /**
   * Render a form to update an existing time.
   * GET times/:id/edit
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async edit({ params, request, response, view }) {
  }

  /**
   * Update time details.
   * PUT or PATCH times/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async update({ params, request, response , auth}) {
    const user = await auth.getUser()
    let data = request.only(['date', 'start_at', 'end_at', 'task_id'])
    data['user_id'] = user.toJSON().id
    const validation = await validate(data, Time.getCreateRule())
    if (validation.fails()) {
      return response.notAcceptable({
        status: 'Failed',
        message: validation.messages()
      });
    }
    await Time.query().where('id', params.id).update(data)
    return response.ok({
      status: true,
      data: data
    })
  }

  /**
   * Delete a time with id.
   * DELETE times/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async destroy({ params, request, response }) {
    const time = await Time.find( params.id )

    if (!time) {
      throw new HttpException("Time Not Found" , 404) ;
    }

    await time.delete()

    return response.ok( {
      status: 'Success',
      message: 'Time deleted!!!'
    } )
  }
}

module.exports = TimeController
