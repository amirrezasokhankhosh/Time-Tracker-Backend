const result = require('dotenv');
const Env = use('Env') ;

if(result.error){
  throw new Error('Check env file');
}

const Bull = use("Rocketseat/Bull");

if (process.env.QUEUE_USING === 'true'){
  Bull.process()
    .ui(Env.get('BULL_PORT')); // http://localhost:9999
  console.log('Running Queue') ;
}
