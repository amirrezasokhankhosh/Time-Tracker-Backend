'use strict'
const Permission = use( 'Permission' );
const { validate } = use( 'Validator' );
const {HttpException} = require('node-exceptions') ;

class PermissionController {

  /**
   * list all permissions
   * @param request
   * @param auth
   * @param response
   * @returns {Promise<*|Promise<any>>}
   */
  async index ({ request, auth, response }){

    let page = request.input('page') || 1 ;
    let permissions = await Permission.paginate(page);

    await response.ok({
      status: 'success' ,
      data: permissions.toJSON()
    }) ;
  }


  async show ({ request, response , params }) {

    let permission = await Permission.query()
      .where('id' , params.id).first() ;

    if (!permission) {
      throw new HttpException(404 , "Permission not found") ;
    }

    await response.ok({
      status: 'success',
      data: permission.toJSON()
    });
  }


    /**
   * create a new permissions
   * @param request
   * @param auth
   * @param response
   * @returns {Promise<*|Promise<any>>}
   */
  async store ({ request, auth, response }){

    const rules = {
      name: 'required|string',
      slug: 'required|string|max:20',
      description: 'required|string|min:15|max:250'
    }

    const data = await request.only( ['name', 'slug', 'description'] )

    const validation = await validate( data, rules );
    if ( validation.fails() ) {
      return response.notAcceptable.json({
        status: 'Failed',
        message: validation.messages()
      });
    }

    const permission = await Permission.create( data )
    await response.ok( permission )

  }
  /**
   * update a permissions
   * @param request
   * @param params
   * @param auth
   * @param response
   * @returns {Promise<*|Promise<any>>}
   */
  async update ({ request, auth, response, params }){

    const rules = {
      slug: 'required|string|max:20',
      description: 'required|string|min:15|max:250'
    };
    const data = request.only( ['slug', 'description'] );
    const validation = await validate( data, rules );

    if ( validation.fails() ) {
      return response.notAcceptable({
        status: 'Failed',
        message: validation.messages()
      });
    }

    const permission = await Permission.query().where( 'id', parseInt( params.id ) ).firstOrFail();
    permission.slug = data.slug;
    permission.description = data.description;
    await response.ok( {
      status: 'Success',
      message: 'Permission updated!!!'
    } );

  }
  /**
   * destroy a permissions
   * @param request
   * @param params
   * @param auth
   * @param response
   * @returns {Promise<*|Promise<any>>}
   */
  async destroy ({ request, auth, response, params }){

    const permission = await Permission.query().where( 'id', parseInt( params.id ) ).firstOrFail();
    await permission.delete();
    await response.ok({
      status: 'Success',
      message: 'permission deleted!!!'
    });

  }

}

module.exports = PermissionController;
