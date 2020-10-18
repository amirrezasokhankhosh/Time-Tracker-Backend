'use strict'


/** @type {import('@adonisjs/lucid/src/Factory')} */
const Role = use('Adonis/Acl/Role') ;
const Permission = use('Adonis/Acl/Permission') ;

class PermissionSeeder {

  async run () {

    // check if admin role exist to use if not create
    let admin_role = await Role.query()
      .where('slug' , 'admin').first() ;


    if (!admin_role) {
      // create admin role
      admin_role = new Role()
      admin_role.name = 'Admin';
      admin_role.slug = 'admin';
      admin_role.description = 'admin of the panel'
      await admin_role.save();
    }


    // the attach function get array of ids of permissions
    // crud permission get crud for each route resource
    // extra permission get all the other extra permission needed

    // User permissions
    await admin_role.permissions()
      .attach(await this.get_resource_permissions(
        'user' ,
        'User' ,
        ['view' , 'store' , 'update' , 'delete']  ,
        [
          {
            slug: 'update_roles' ,
            name: 'Update a users roles'
          } ,
          {
            slug: 'current_permissions' ,
            name: 'get current user permissions'
          } ,
        ]
      ));

    // Role table permissions
    await admin_role.permissions()
      .attach(await this.get_resource_permissions(
        'role' ,
        'Role' ,
        ['view' , 'store' , 'update' , 'delete']  ,
        [
          {
            slug: 'update_permissions' ,
            name: 'Update a single Roles permissions' ,
          } ,
        ]

      ));



    // Permission table permissions
    await admin_role.permissions()
      .attach(await this.get_resource_permissions(
        'permission' ,
        'Permission' ,
        ['view' , 'store' , 'update' , 'delete']
      ));


    await admin_role.permissions()
      .attach(await this.get_resource_permissions(
        'product' ,
        'Product' ,
        ['view' , 'store' , 'update' , 'delete']
      ));

    await admin_role.permissions()
      .attach(await this.get_resource_permissions(
        'product_category' ,
        'Product Category' ,
        ['view' , 'store' , 'delete' , 'update' ]
      ));


    // File permissions
    await admin_role.permissions()
      .attach(await this.get_resource_permissions(
        'file' ,
        'File' ,
        ['view' , 'store']
      ));
  }


  // create new permission and return permission_id
  async add_permission(slug , name) {
    try {
      const new_permission = new Permission() ;
      new_permission.slug = slug ;
      new_permission.name = name ;
      await new_permission.save() ;
      console.log('created permissions for ' + slug) ;
      return new_permission.id ;
    } catch (e) {
      return null ;
    }
  }


  /**
   * get array of ids for crud permission based on slug and name
   * @param {string} slug
   * @param {string }name
   * @param {array} crud_items
   * @param {array} extra_permissions - all the other permissions needed to be add for this resource
   * @returns {Promise<*[]>}
   */
  async get_resource_permissions(slug , name , crud_items, extra_permissions= []) {

    let permissions = [] ;

    // add crud permissions
    if (crud_items.includes('view')) {
      permissions.push(
        await this.add_permission(slug + '-view' , 'View ' + name )
      )
    }

    if (crud_items.includes('update')) {
      permissions.push(
        await this.add_permission(slug + '-update' , 'Update ' + name)
      )
    }
    if (crud_items.includes('delete')) {
      permissions.push(
        await this.add_permission(slug + '-delete' , 'Delete a ' + name)  ,
      )
    }
    if (crud_items.includes('store')) {
      permissions.push(
        await this.add_permission(slug + '-store' , 'Add New ' + name)  ,
      )
    };

    // add extra permissions for this resource
    for (let i=0 ; i < extra_permissions.length ; i++) {
      permissions.push(
        await this.add_permission(slug + '-' + extra_permissions[i].slug , extra_permissions[i].name)  ,
      )
    }

    // remove nulls
    permissions = permissions.filter(permission => permission !== null) ;

    return permissions ;
  }

}

module.exports = PermissionSeeder
