'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')

class Project extends Model {

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
      name: `required|max:250|unique:${this.table},name,name,${data.name}`,
      description: 'max:250',
      users: 'array',
    }
  }


  users() {
    return this
      .belongsToMany('App/Models/User' ,
        'project_id' , 'user_id' , 'id' , 'id')
      .pivotTable('project_user')
  }
}

module.exports = Project
