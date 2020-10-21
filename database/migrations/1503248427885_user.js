'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema');

class UserSchema extends Schema {
  up () {
    this.create('users', table => {
      table.increments();
      table.timestamps() ;
      table.string('name') ;
      table.string('username', 80).notNullable() ;
      table.string('email', 254) ;
      table.string('phone_number', 11) ;
      table.string('password', 60) ;
      table.string('national_code', 10) ;
      table.text('bio').nullable() ;
    })
  }

  down () {
    this.drop('users');
  }
}

module.exports = UserSchema;
