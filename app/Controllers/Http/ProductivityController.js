'use strict'

const co = require("co")

const User = use('App/Models/User')

class ProductivityController {

    async index({ response }) {
        var users = await User.query().with('restrictedSites').with('times').with('unproductives').fetch()
        users = users.toJSON()
        for (var i = 0; users[i]; i++) {
            var days = []
            if (users[i].times[0]) {
                for (var j = 0; users[i].times[j]; j++) {
                    if (users[i].unproductives[0]) {
                        for (var k = 0; users[i].unproductives[k]; k++) {
                            users[i].times[j]['unproductives'] = []
                            users[i].times[j]['totalUnproductiveTime'] = 0
                            if (users[i].times[j].day - users[i].unproductives[k].day == 0) {
                                if (users[i].times[j].end_at > users[i].unproductives[k].start_at) {
                                    users[i].times[j].unproductives.push(users[i].unproductives[k])
                                    // var timeOfUnproductive = users[i].unproductives[k].end_at - users[i].times[j].start_at
                                    // timeOfUnproductive = timeOfUnproductive - users[i].unproductives[k].end_at - users[i].times[j].end_at
                                    // timeOfUnproductive = timeOfUnproductive - users[i].unproductives[k].start_at - users[i].times[j].start_at
                                    // users[i].times[j].totalUnproductiveTime = timeOfUnproductives
                                    this.timeDiffrence(users[i].unproductives[k].end_at, users[i].times[j].start_at)
                                }
                            }
                        }
                    }
                }
            }
        }
    }
    timeDiffrence(first, second) {
        var time_start = new Date();
        var time_end = new Date();
        var value_start = first.split(':');
        var value_end = second.split(':');
        console.log(value_start)
        time_start.setHours(value_start[0] - 20, value_start[1] - 30, 0, 0)
        time_end.setHours(value_end[0] - 20, value_end[1] - 30, 0, 0)
        console.log((time_start.getTime() - time_end.getTime()) / 60000)
    }
}

module.exports = ProductivityController
