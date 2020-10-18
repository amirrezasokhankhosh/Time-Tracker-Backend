'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')

class Task extends Model {

  static getCreateRule() {
    return {
      title: `required|max:250|unique:${this.table}` ,
      content: 'max:10000' ,
      project_id: 'required|integer'
    }
  }

  /**
   *
   * @param data - contain unique values to not validate
   * @returns {{name: string, description: string, users: string}}
   */
  static getUpdateRule(data) {
    return {
      title: `required|max:250|unique:${this.table},title,title,${data.title}`,
      content: 'max:10000',
      project_id: 'required|integer'
    }
  }

}

module.exports = Task
