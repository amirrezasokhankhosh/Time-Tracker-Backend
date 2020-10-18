'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')

class SiteUser extends Model {
    static getCreateRule() {
        return {
            site_id: `required`,
            user_id: 'required'
        }
    }
}

module.exports = SiteUser
