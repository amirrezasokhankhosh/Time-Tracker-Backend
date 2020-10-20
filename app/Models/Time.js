'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')

class Time extends Model {

  static get createdAtColumn () {
    return null;
  }

  static get updatedAtColumn () {
    return null;
  }

  static getCreateRule() {
    return {
      day : 'required|string',
      start_at: 'required|string',
      end_at: 'required|string',
      task_id: 'required',
      user_id: 'required'
    }
  }


}

module.exports = Time
