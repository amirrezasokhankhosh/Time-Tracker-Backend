'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')

class Group extends Model {

  // ____ rules
  static getCreateRule() {
    return {
      name: `required|max:250|unique:${this.table}` ,
      description: 'max:250' ,
      users: 'array' ,
    }
  }


  /**
   *
   * @param data - contain unique values to not validate
   * @returns {{name: string, description: string, users: string}}
   */
  static getUpdateRule(data) {
    return {
      name: `required|max:250|unique:${this.table},name,name,${data.name}` ,
      description: 'max:250' ,
      users: 'array' ,
    }
  }

  // _____ Relations
  users() {
    return this
      .belongsToMany('App/Models/User' ,
        'group_id' , 'user_id' , 'id' , 'id')
      .pivotTable('group_user')
  }

}

module.exports = Group
