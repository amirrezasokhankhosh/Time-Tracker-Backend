'use strict'
const BaseExceptionHandler = use('BaseExceptionHandler')
const {HttpException , LogicalException} = require('node-exceptions') ;
const Env = use('Env') ;

/**
 * This class handles all exceptions thrown during
 * the HTTP request lifecycle.
 *
 * @class ExceptionHandler
 */

class ExceptionHandler extends BaseExceptionHandler {
  /**
   * Handle exception thrown during the HTTP lifecycle
   *
   * @method handle
   *
   * @param  {Object} error
   * @param  {Object} options.request
   * @param  {Object} options.response
   *
   * @return {void}
   */
  async handle (error, { request, response }) {

    let node_env = Env.get('NODE_ENV') ;

    if (error instanceof HttpException) {
      return response.status(error.status).json({
        status: 'failed' ,
        message: error.message ,
      }) ;

    }

    if (error.constructor.name === 'ModelNotFoundException') {
      return response.status(404).json({
        status: 'failed' ,
        message: 'Request Resource Not Found on database' ,
      }) ;
    }

    if (error instanceof LogicalException) {
      return response.status(error.status).json({
        status: 'failed' ,
        message: error.toString() ,
      }) ;
    }

    return response.status(500).send({
      status: 'Internal Server Error' ,
      // show error in only in development mode
      message: ((node_env === 'production') ?  'Something went wrong' : error.message ) ,
    })

  }

  /**
   * Report exception for logging or debugging.
   *
   * @method report
   *
   * @param  {Object} error
   * @param  {Object} options.request
   *
   * @return {void}
   */
  async report (error, { request }) {

    let node_env = Env.get('NODE_ENV') ;

    // if not in production console log error
    if (node_env !== 'production') {
      console.log(error) ;
    }
  }
}

module.exports = ExceptionHandler
