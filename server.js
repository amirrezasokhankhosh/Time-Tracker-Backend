'use strict'

/*
|--------------------------------------------------------------------------
| Http server
|--------------------------------------------------------------------------
|
| This file bootstrap Adonisjs to start the HTTP server. You are free to
| customize the process of booting the http server.
|
| """ Loading ace commands """
|     At times you may want to load ace commands when starting the HTTP server.
|     Same can be done by chaining `loadCommands()` method after
|
| """ Preloading files """
|     Also you can preload files by calling `preLoad('path/to/file')` method.
|     Make sure to pass relative path from the project root.
*/

require('dotenv').config()

let elastic_active = process.env.ELASTIC_ACTIVE ;
let apm ;

//____ run apm module. this should start before any other package
if (elastic_active === 'true') {
	apm = require('elastic-apm-node').start({
	  serviceName: process.env.APM_NAME ,
	  secretToken: process.env.APM_TOKEN ,
	  serverUrl: process.env.APM_URL ,
	  usePathAsTransactionName: true ,
	})

}

module.exports.apm = apm ;

//______________

const { Ignitor } = require( '@adonisjs/ignitor' )

new Ignitor( require( '@adonisjs/fold' ) )
  .appRoot( __dirname )
  .preLoad( 'preloads/bull' )
  .fireHttpServer()
  .catch( console.error )


