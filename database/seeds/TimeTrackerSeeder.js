'use strict'

/*
|--------------------------------------------------------------------------
| ProductJSeeder
|--------------------------------------------------------------------------
|
| Make use of the Factory instance to seed database with dummy data or
| make use of Lucid models directly.
|
*/

/** @type {import('@adonisjs/lucid/src/Factory')} */
const Factory = use('Factory')
const Product = use('App/Models/Product') ;
const User = use('App/Models/User') ;

class TimeTrackerSeeder {

  async run () {

    let products = await Factory.model('App/Models/Product')
      .createMany(10) ;


    let projects = await Factory.model('App/Models/Project')
      .createMany(5) ;

    let groups = await Factory.model('App/Models/Group')
      .createMany(10) ;


    let times = await Factory.model('App/Models/Time')
      .createMany(10) ;

    let users = (await User.all()) ;


    for (let i=0 ; i < projects.length ; i++) {

      // create tasks for each projects
      let tasks = await Factory.model('App/Models/Task')
        .createMany(5 , {
          project_id: projects[i].id ,
        }) ;

      for (let i=0 ; i < tasks.length ; i++) {

        // create times for each task
        let times = await Factory.model('App/Models/Time')
          .createMany(5 , {
            task_id: tasks[i].id ,
          }) ;
      }
    }

    // sync groups with users
    for (let i=0 ; i < users.rows.length ; i++) {
      let groups_id = groups.map((group) => {
        return group.id ;
      }) ;
      const shuffled = groups_id.sort(() => 0.5 - Math.random());
      let selected_group_ids = shuffled.slice(0, 3);
      await users.rows[i].groups().sync(selected_group_ids) ;
    }

    // sync prjects with users
    for (let i=0 ; i < users.rows.length ; i++) {
      let projects_id = projects.map((project) => {
        return project.id ;
      }) ;
      const shuffled = projects_id.sort(() => 0.5 - Math.random());
      let selected_project_ids = shuffled.slice(0, 3);
      await users.rows[i].projects().sync(selected_project_ids) ;
    }

  }
}

module.exports = TimeTrackerSeeder ;
