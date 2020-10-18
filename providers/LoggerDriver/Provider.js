'use strict'
const { ServiceProvider } = require( '@adonisjs/fold' )


/**
 * Logger Driver provider
 * */
class LoggerDriverProvider extends ServiceProvider {

  register (){

    this.app.extend( 'Adonis/Src/Logger', 'database', () => {


      class DatabaseDriver {

        setConfig() {

        }

        log (...args){

          const Logger = use( './src/Logger' )

          const chalk = require('chalk')
          if(args[0] === 0){
            console.log(chalk.red.bold(args[0]) + " "+ args[1])
          } else if(args[0] === 1){
            console.log(chalk.red(args[0]) + " "+ args[1])
          } else if (args[0] === 2 ){
            console.log(chalk.magenta(args[0]) + " "+ args[1])
          }else if (args[0] === 3){
            console.log(chalk.redBright(args[0]) + " "+ args[1])
          }else if (args[0] === 4 ){
            console.log(chalk.yellow(args[0]) + " "+ args[1])
          }else if(args[0] === 5){
            console.log(chalk.cyan(args[0]) + " "+ args[1])
          }else if(args[0]===6){
            console.log(chalk.green(args[0]) + " "+ args[1])
          }else {
            console.log(chalk.blue(args[0]) + " "+ args[1])
          }

          Logger(args[0], args[1])

        }

      }

      return DatabaseDriver ;

    })
  }

  boot (){

  }
}

module.exports = LoggerDriverProvider ;
