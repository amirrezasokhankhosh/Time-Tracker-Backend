'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')

class Unproductive extends Model {
    static getCreateRule() {
        return {
            site_id: `required`,
            user_id: 'required',
            start_at: 'required|date_format:YYYY-MM-DD HH',
            end_at: 'required|date_format:YYYY-MM-DD HH',
        }
    }
}

module.exports = Unproductive
