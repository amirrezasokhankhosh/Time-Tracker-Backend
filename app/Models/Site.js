'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')

class Site extends Model {
  static getCreateRule() {
    return {
      url: `required|unique:${this.table}`,
      description: 'string'
    }
  }

  users() {
    return this.belongsToMany('App/Models/User').pivotTable('site_users')
  }

  groups() {
    return this.belongsToMany('App/Models/Group').pivotTable('site_groups')
  }
}

module.exports = Site
