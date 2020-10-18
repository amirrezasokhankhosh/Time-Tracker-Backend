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
      start_at: 'required|date_format:YYYY-MM-DD HH',
      end_at: 'required|date_format:YYYY-MM-DD HH',
      task_id: 'required',
      user_id: 'required'
    }
  }


}

module.exports = Time
