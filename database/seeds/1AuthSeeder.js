'use strict'

/*
|--------------------------------------------------------------------------
| AuthSeeder
|--------------------------------------------------------------------------
|
| Make use of the Factory instance to seed database with dummy data or
| make use of Lucid models directly.
|
*/

/** @type {import('@adonisjs/lucid/src/Factory')} */
const Factory = use('Factory')
const User = use('App/Models/User') ;
const Role = use('Adonis/Acl/Role') ;
const Permission = use('Adonis/Acl/Permission') ;

class AuthSeeder {

  async run () {


    // create admin user
    let admin_user = new User() ;
    admin_user.name = 'Admin User' ;
    admin_user.username = 'admin' ;
    admin_user.phone_number = '09111111111' ;
    admin_user.national_code = '1111111' ;
    admin_user.email = 'admin@admin.com' ;
    admin_user.password = 'password' ;
    await admin_user.save() ;

    let admin_role = await Role.query().where('slug' , 'admin').first() ;

    if (admin_role) {
      await admin_user.roles().attach([
        admin_role.id
      ]) ;
    }



    // create normal user without any permission for testing
    let user = new User() ;
    user.name = 'Normal User' ;
    user.username = 'user' ;
    user.phone_number = '09111111122' ;
    user.national_code = '12222' ;
    user.email = 'user@user.com' ;
    user.password = 'password' ;
    await user.save() ;

  }


}

module.exports = AuthSeeder
