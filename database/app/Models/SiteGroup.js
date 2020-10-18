'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')

class SiteGroup extends Model {
    static getCreateRule() {
        return {
            site_id: `required`,
            group_id: 'required'
        }
    }
}

module.exports = SiteGroup
