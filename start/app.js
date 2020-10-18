'use strict'

const path = require( 'path' );
/*
|--------------------------------------------------------------------------
| Providers
|--------------------------------------------------------------------------
|
| Providers are building blocks for your Adonis app. Anytime you install
| a new Adonis specific package, chances are you will register the
| provider here.
|
*/


const providers = [
  '@adonisjs/framework/providers/AppProvider',
  '@adonisjs/framework/providers/ViewProvider',
  '@adonisjs/lucid/providers/LucidProvider',
  '@adonisjs/bodyparser/providers/BodyParserProvider',
  '@adonisjs/cors/providers/CorsProvider',
  '@adonisjs/shield/providers/ShieldProvider',
  '@adonisjs/session/providers/SessionProvider',
  '@adonisjs/auth/providers/AuthProvider',
  '@adonisjs/validator/providers/ValidatorProvider',
  '@adonisjs/drive/providers/DriveProvider',
  '@adonisjs/redis/providers/RedisProvider',
  'adonis-cache/providers/CacheProvider',
  'adonis-acl/providers/AclProvider',
  "@rocketseat/adonis-bull/providers/Bull",
  '@adonisjs/drive/providers/DriveProvider',
  'adonis-swagger/providers/SwaggerProvider' ,
	path.join(__dirname, '..', 'providers', 'LoggerDriver/Provider') ,
];

// add elastiv provider if activated
let elastic_active = process.env.ELASTIC_ACTIVE ;
if (elastic_active) {
	providers.push(path.join(__dirname, '..', 'providers', 'Elastic/Provider')) ;
}


/*
|--------------------------------------------------------------------------
| Ace Providers
|--------------------------------------------------------------------------
|
| Ace providers are required only when running ace commands. For example
| Providers for migrations, tests etc.
|
*/
const aceProviders = [
  '@adonisjs/lucid/providers/MigrationsProvider',
  'adonis-acl/providers/CommandsProvider',
  'adonis-cache/providers/CommandsProvider',
]

/*
|--------------------------------------------------------------------------
| Aliases
|--------------------------------------------------------------------------
|
| Aliases are short unique names for IoC container bindings. You are free
| to create your own aliases.
|
| For example:
|   { Route: 'Adonis/Src/Route' }
|
*/
const aliases = {
  Role: 'Adonis/Acl/Role',
  Permission: 'Adonis/Acl/Permission',
  Cache: 'Adonis/Addons/Cache',
  Queue: 'Adonis/Addons/Queue',
}

/*
|--------------------------------------------------------------------------
| Commands
|--------------------------------------------------------------------------
|
| Here you store ace commands for your package
|
*/
const commands = [
  'App/Commands/MakeJob',
  'App/Commands/QueueListen',
];

// const jobs = [
//   'App/Jobs/TestJob'
// ]

module.exports = { providers, aceProviders, aliases, commands }

