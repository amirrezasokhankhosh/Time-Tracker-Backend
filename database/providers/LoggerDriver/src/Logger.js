var Logs = use('App/Models/Log');
/**
 * store logs on db
 *
 * @param level
 * @param description
 * */
async function Logger (level, description){
  let logs = new Logs();
  logs.description = description;
  logs.error_level = level;
  await logs.save();
}
module.exports = Logger

