'use strict'

const co = require("co")

const User = use('App/Models/User')

class ProductivityController {

    async index({ response }) {
        var users = await User.query().with('restrictedSites').with('times').with('unproductives').fetch()
        users = users.toJSON()
        for (var i = 0; users[i]; i++) {
            if (users[i].times[0]) {
                for (var j = 0; users[i].times[j]; j++) {
                    if (users[i].unproductives[0]) {
                        for (var k = 0; users[i].unproductives[k]; k++) {
                            users[i].times[j]['unproductives'] = []
                            users[i].times[j]['totalUnproductiveTime'] = 0
                            if (users[i].times[j].day - users[i].unproductives[k].day == 0) {
                                if (users[i].times[j].end_at > users[i].unproductives[k].start_at) {
                                    users[i].times[j].unproductives.push(users[i].unproductives[k])
                                    if (users[i].unproductives[k].end_at < users[i].times[j].end_at) {
                                        users[i].times[j].totalUnproductiveTime += this.timeDiffrence(users[i].unproductives[k].start_at, users[i].unproductives[k].end_at)
                                    } else {
                                        users[i].times[j].totalUnproductiveTime += this.timeDiffrence(users[i].unproductives[k].start_at, users[i].times[j].end_at)
                                    }
                                }
                            }
                        }
                    }
                }
            }
        }
        return response.ok({
            status: true,
            data: users
        });
    }

    timeDiffrence(first, second) {
        var time_start = new Date()
        var time_end = new Date()
        var value_start = first.split(':')
        var value_end = second.split(':')
        time_start.setHours(value_start[0] - 20, value_start[1] - 30, 0, 0)
        time_end.setHours(value_end[0] - 20, value_end[1] - 30, 0, 0)
        return (time_end.getTime() - time_start.getTime()) / 60000
    }

    async show({ response, params }) {
        var user = await User.query().where('id', params.user_id).with('restrictedSites').with('times').with('unproductives').fetch()
        user = user.toJSON()[0]
        if (user.times[0]) {
            for (var j = 0; user.times[j]; j++) {
                if (user.unproductives[0]) {
                    for (var k = 0; user.unproductives[k]; k++) {
                        user.times[j]['unproductives'] = []
                        user.times[j]['totalUnproductiveTime'] = 0
                        if (user.times[j].day - user.unproductives[k].day == 0) {
                            if (user.times[j].end_at > user.unproductives[k].start_at) {
                                user.times[j].unproductives.push(user.unproductives[k])
                                if (user.unproductives[k].end_at < user.times[j].end_at) {
                                    user.times[j].totalUnproductiveTime += this.timeDiffrence(user.unproductives[k].start_at, user.unproductives[k].end_at)
                                } else {
                                    user.times[j].totalUnproductiveTime += this.timeDiffrence(user.unproductives[k].start_at, user.times[j].end_at)
                                }
                            }
                        }
                    }
                }
            }
        }

        return response.ok({
            status: true,
            data: user
        });
    }
}

module.exports = ProductivityController
