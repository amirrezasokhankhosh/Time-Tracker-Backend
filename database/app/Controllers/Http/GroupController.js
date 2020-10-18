'use strict'

/** @typedef {import('@adonisjs/framework/src/Request')} Request */
/** @typedef {import('@adonisjs/framework/src/Response')} Response */
/** @typedef {import('@adonisjs/framework/src/View')} View */

const Group = use('App/Models/Group') ;
const { validate } = use("Validator");

/**
 * Resourceful controller for interacting with groups
 */
class GroupController {
  /**
   * Show a list of all groups.
   * GET groups
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async index ({ request, response, view }) {

    let query = Group.query().with('users') ;

    let groups = request.input('all') ?
      (await query.fetch()) :
      (await query.paginate(request.page)) ;

    return response.ok({
      status: true,
      data: groups.toJSON()
    });
  }

  /**
   * Create/save a new group.
   * POST groups
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async store ({ request, response }) {

    let data = request.only(['name' , 'description' , 'users']) ;

    const validation = await validate(data,  Group.getCreateRule());
    if (validation.fails()) {
      return response.notAcceptable({
        status: 'Failed',
        message: validation.messages()
      });
    }

    // seprate users
    let users = data.users ;
    delete data.users ;

    let group = await Group.create(data) ;

    if (users) {
      await group.users().sync(users) ;
      await group.load('users') ;
    }

    return response.ok({
      status: true,
      data: group.toJSON() ,
    });
  }

  /**
   * Display a single group.
   * GET groups/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async show ({ params, request, response, view }) {

    let group = await Group.findOrFail(params.id) ;

    return response.ok({
      status: true,
      data: group.toJSON() ,
    });

  }


  /**
   * Update group details.
   * PUT or PATCH groups/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async update ({ params, request, response }) {

    let group = await Group.findOrFail(params.id) ;
    let data = request.only(['name' , 'description' , 'users']) ;

    const validation = await validate(data,  Group.getUpdateRule(data));
    if (validation.fails()) {
      return response.notAcceptable({
        status: 'Failed',
        message: validation.messages()
      });
    }

    // seprate users
    let users = data.users ;
    delete data.users ;

    if (users) {
      await group.users().sync(users) ;
      await group.load('users') ;
    }

    await Group.query().where('id' , group.id).update(data) ;


    return response.ok({
      status: true,
      message: 'group updated' ,
    });

  }

  /**
   * Delete a group with id.
   * DELETE groups/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async destroy ({ params, request, response }) {

    let group = await Group.findOrFail(params.id) ;

    await group.delete() ;

    return response.ok({
      status: true,
      message: 'group deleted' ,
    });
  }

  async getUsers({request , response , params}) {

    let group = await Group.findOrFail(params.id) ;
    let users ;


    if (request.input('tagged')) {

      users = await group.users().fetch() ;


    } else {

      let query = group.users()
      users = request.input('all') ?
        (await query.fetch()) :
        (await query.paginate(request.page)) ;
    }

    return response.ok({
      status: true,
      data: users.toJSON()
    });
  }


}

module.exports = GroupController
