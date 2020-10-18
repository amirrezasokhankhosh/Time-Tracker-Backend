'use strict'

/** @typedef {import('@adonisjs/framework/src/Request')} Request */
/** @typedef {import('@adonisjs/framework/src/Response')} Response */
/** @typedef {import('@adonisjs/framework/src/View')} View */

const Task = use('App/Models/Task') ;
const { validate } = use("Validator");

/**
 * Resourceful controller for interacting with tasks
 */
class TaskController {
  /**
   * Show a list of all tasks.
   * GET tasks
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async index ({ request, response, view }) {

    let query = Task.query() ;

    let tasks = request.input('all') ?
      (await query.fetch()) :
      (await query.paginate(request.page))

    return response.ok({
      status: true,
      data: tasks.toJSON()
    })
  }


  /**
   * Create/save a new task.
   * POST tasks
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async store ({ request, response }) {

    let data = request.only(['title' , 'content' , 'project_id']) ;

    const validation = await validate(data,  Task.getCreateRule());

    if (validation.fails()) {
      return response.notAcceptable({
        status: 'Failed',
        message: validation.messages()
      });
    }

    let task = await Task.create(data) ;

    return response.ok({
      status: true,
      data: task.toJSON() ,
    })
  }

  /**
   * Display a single task.
   * GET tasks/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async show ({ params, request, response, view }) {

    let item = await Task.findOrFail(params.id) ;

    return response.ok({
      status: true,
      data: item.toJSON() ,
    });
  }



  /**
   * Update task details.
   * PUT or PATCH tasks/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async update ({ params, request, response }) {

    let data = request.only(['title' , 'content' , 'project_id']) ;

    const validation = await validate(data, Task.getUpdateRule(data));
    if (validation.fails()) {
      return response.notAcceptable({
        status: 'Failed',
        message: validation.messages()
      });
    }

    let item = await Task.create(data) ;

    return response.ok({
      status: true,
      data: item.toJSON() ,
    });
  }

  /**
   * Delete a task with id.
   * DELETE tasks/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async destroy ({ params, request, response }) {

    let item = await Task.findOrFail(params.id) ;

    await item.delete() ;

    return response.ok({
      status: true,
      message: 'Task deleted' ,
    });
  }
}

module.exports = TaskController
