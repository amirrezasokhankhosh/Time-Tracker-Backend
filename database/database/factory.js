'use strict'

/*
|--------------------------------------------------------------------------
| Factory
|--------------------------------------------------------------------------
|
| Factories are used to define blueprints for database tables or Lucid
| models. Later you can use these blueprints to seed your database
| with dummy data.
|
*/

/** @type {import('@adonisjs/lucid/src/Factory')} */
const Factory = use('Factory')
const Project = use('App/Models/Project') ;
const Task = use('App/Models/Task') ;
const Time = use('App/Models/Time') ;
const Group = use('App/Models/Group') ;
const moment = use('moment') ;
const User = use('App/Models/User') ;

Factory.blueprint('App/Models/Schedule', (faker, i, data) => {
  return {
    name: data.name,
    api: data.api
  }
})

Factory.blueprint('App/Models/User', (faker, i, data) => {
  return {
    name: data.name || faker.word() ,
    username: data.username || faker.word() ,
    email: data.email || faker.email() ,
    password: data.password || 'password' ,
  }
})


Factory.blueprint('App/Models/Product', (faker, i, data) => {
  return {
    name: data.name || faker.word() ,
    content: data.content || faker.sentence() ,
    image: data.image || 'test.jpg' ,
    code: data.code || faker.word() ,
    available: data.available || faker.prime({min: 1, max: 20}) ,
    max_available: data.max_available || faker.prime({min: 100, max: 1000})  ,
    price: data.price || faker.prime({min: 1, max: 1000}) * 10000 ,
  }
})


Factory.blueprint('App/Models/ProductCategory', (faker, i, data) => {
  return {
    name: data.name || faker.word() ,
    description: data.description || faker.sentence() ,
  }
})



Factory.blueprint('App/Models/Project', (faker, i, data) => {
  return {
    name: data.name || faker.word() ,
    description: data.description || faker.sentence() ,
  }
})

Factory.blueprint('App/Models/Group', (faker, i, data) => {
  return {
    name: data.name || faker.word() ,
    description: data.description || faker.sentence() ,
  }
})


Factory.blueprint('App/Models/Task', async (faker, i, data) => {
  return {
    title: data.name || faker.word() ,
    content: data.description || faker.sentence() ,
    project_id: data.project_id || (await Project.last()).id ,
  }
})


Factory.blueprint('App/Models/Time', async (faker, i, data) => {
  return {
    start_at: data.start_at || moment().format("YYYY-MM-DD HH:mm:ss") ,
    end_at: data.end_at || moment().add(Math.random * 10 , 'hours').format("YYYY-MM-DD HH:mm:ss") ,
    task_id: data.task_id || (await Task.last()).id ,
    user_id: data.user_id || (await User.last()).id ,
  }
})

