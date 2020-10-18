'use strict'
const { validate } = use( 'Validator' );
const Role = use( 'Role' )
const Permission = use('Permission') ;
const {HttpException} = require('node-exceptions') ;

class RoleController {

  /**
   *
   * list all roles
   * @param prams
   * @param auth
   * @param response
   * @returns {Promise<*|Promise<any>>}
   */
  async index ({ request, auth, response , params }){

    let page = request.input('page') || 1 ;

    const roles = await Role.query().with( 'permissions' ).paginate(page);
    return {
      status: 'success' ,
      data: response.ok(roles.toJSON())
    } ;
  }

  async show ({ request, response , params }){
    const roles = await Role.query().with( 'permissions' )
      .where('id' , params.id).fetch();
    return{
      status: 'success' ,
      data: response.ok(roles.toJSON())
    }
  }


  /**
   * create a role
   * @param prams
   * @param auth
   * @param response
   * @returns {Promise<*|Promise<any>>}
   */
  async store ({ request, auth, response }){

    const rules = {
      name: 'required',
      slug: 'required|unique:roles|max:20',
      description: 'max:250',
    }

    const data = request.only( ['name', 'slug', 'description'] );

    const validation = await validate( data, rules );
    if ( validation.fails() ) {
      return response.notAcceptable({
        status: 'Failed',
        message: validation.messages()
      });
    }


    const permissions = request.only( ['permissions'] )
    const role = await Role.create( data )

    if ( permissions ) {
      await role.permissions().attach( permissions.permissions )
    }

    await role.load('permissions')

    return response.ok({
      status: 'success' ,
      data: role.toJSON()
    })

  }

  /**
   * update a role
   * @param prams
   * @param auth
   * @param response
   * @returns {Promise<*|Promise<any>>}
   */
  async update ({ request, auth, response, params }){

    let slug = request.input('slug') ;

    const rules = {
      name: 'required|string',
      slug: `required|string|max:20|unique:roles|slug|slug|${slug}`,
      description: 'max:250',
    }

    const data = request.only( ['name', 'slug', 'description'] );
    const permissions = request.only( ['permissions'] );

    const validation = await validate( data, rules );
    if ( validation.fails() ) {
      return response.notAcceptable({
        status: 'Failed',
        message: validation.messages()
      });
    }

    const role = await Role.findOrFail(params.id)

    if (!role) {
      throw new HttpException('Role not found' , 404) ;
    }

    await role.merge( data );
    await role.save();

    return response.ok({
      status: 'success' ,
      data: role.toJSON() ,
    }) ;

  }

  /**
   * delete a role
   * @param prams
   * @param auth
   * @param response
   * @returns {Promise<*|Promise<any>>}
   */
  async destroy ({ request, auth, response, params }){
    const role = await Role.find( params.id )

    if (!role) {
      throw new HttpException("Role Not Found" , 404) ;
    }

    await role.delete()

    return response.ok( {
      status: 'Success',
      message: 'Role deleted!!!'
    } )
  }



  async permissions({request , response , params}) {

    let role_id = params.id ;
    let mapped = request.get()['mapped'] ;
    let role = await Role.find(role_id) ;

    if (!role) {
      throw new HttpException('Role not found' , 404) ;
    }

    let role_permissions_final  ;

    // if parameter mapped is send get all permissions and map with the one that user have
    if (mapped) {
      let permissions = (await Permission.all()).toJSON() ;
      let role_permissions =  (await role.permissions().fetch()).toJSON() ;

      for (let i=0 ; i < permissions.length ; i++) {
        let found = role_permissions.find((item) => {
          return permissions[i].slug == item.slug ;
        })

        // if role is in users role add flag
        if (found) {
          permissions[i].belongs_to_role = true ;
        } else {
          permissions[i].belongs_to_role = false ;
        }
      }
      role_permissions_final = permissions ;
    } else {
      role_permissions_final = (await role.permissions().fetch()).toJSON() ;
    }

    return response.ok( {
      status: "success",
      message: role_permissions_final ,
    } )
  }

  async updatePermissions({request, response , params}) {

    const rules = {
      permissions: 'required|array',
    };

    const data = request.only( ['permissions'] ) ;

    const validation = await validate( data, rules );
    if ( validation.fails() ) {
      return response.notAcceptable({
        status: 'Failed',
        message: validation.messages()
      });
    }

    let role = await Role.find(params.id);
    await role.permissions().sync(data.permissions) ;

    return response.ok( {
      status: "success",
      message: 'Permissions Updated Successfully' ,
    } )
  }

}


module.exports = RoleController
