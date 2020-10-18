'use strict'

/** @typedef {import('@adonisjs/framework/src/Request')} Request */
/** @typedef {import('@adonisjs/framework/src/Response')} Response */
/** @typedef {import('@adonisjs/framework/src/View')} View */

const Project = use('App/Models/Project') ;
const { validate } = use("Validator");

/**
 * Resourceful controller for interacting with projects
 */
class ProjectController {
  /**
   * Show a list of all projects.
   * GET projects
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async index ({ request, response, view }) {

    let query = Project.query() ;

    let projects = request.input('all') ?
      (await query.fetch()) :
      (await query.paginate(request.page))

    return response.ok({
      status: true,
      data: projects.toJSON()
    })
  }


  /**
   * Create/save a new project.
   * POST projects
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async store ({ request, response }) {

    let data = request.only(['name' , 'description']) ;

    const validation = await validate(data,  Project.getCreateRule());
    if (validation.fails()) {
      return response.notAcceptable({
        status: 'Failed',
        message: validation.messages()
      });
    }

    let project = await Project.create(data) ;

    return response.ok({
      status: true,
      data: project.toJSON() ,
    });
  }

  /**
   * Display a single project.
   * GET projects/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async show ({ params, request, response, view }) {

    let project = await Group.findOrFail(params.id) ;

    return response.ok({
      status: true,
      data: project.toJSON() ,
    });
  }


  /**
   * Update project details.
   * PUT or PATCH projects/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async update ({ params, request, response }) {

    let data = request.only(['name' , 'description']) ;

    const validation = await validate(data,  Project.getUpdateRule(data));
    if (validation.fails()) {
      return response.notAcceptable({
        status: 'Failed',
        message: validation.messages()
      });
    }

    let project = await Project.create(data) ;

    return response.ok({
      status: true,
      data: project.toJSON() ,
    });
  }

  /**
   * Delete a project with id.
   * DELETE projects/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async destroy ({ params, request, response }) {

    let item = await Project.findOrFail(params.id) ;

    await item.delete() ;

    return response.ok({
      status: true,
      message: 'project deleted' ,
    });
  }



}

module.exports = ProjectController
