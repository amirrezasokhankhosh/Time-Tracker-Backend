'use strict'

/*
|--------------------------------------------------------------------------
| ScheduleSeeder
|--------------------------------------------------------------------------
|
| Make use of the Factory instance to seed database with dummy data or
| make use of Lucid models directly.
|
*/

/** @type {import('@adonisjs/lucid/src/Factory')} */
const Database = use('Database')
const Factory = use('Factory')

class ScheduleSeeder {
  async run () {
    const schedule = await Factory.model('App/Models/Schedule').create({
      name: "robot",
      api: "http://localhost:3333"
    })
  }
}

module.exports = ScheduleSeeder
