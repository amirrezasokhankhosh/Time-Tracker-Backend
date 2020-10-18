"use strict";

const Env = use( "Env" );

module.exports = {
  // redis connection
  connection: Env.get( "REDIS_CONNECTION", "local" ),
  bull: {
    redis: {
      host: Env.get( "REDIS_HOST"),
      port: Env.get( "REDIS_PORT"),
      password: Env.get( "REDIS_PASSWORD"),
      db: 0,
      keyPrefix: ""
    }
  }
};
