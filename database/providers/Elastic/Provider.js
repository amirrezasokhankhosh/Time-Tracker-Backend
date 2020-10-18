'use strict'

const { ServiceProvider } = require('@adonisjs/fold')
const Elastic = require('./src/Elastic') ;
const APM = require('./src/APM') ;
const {apm} = require('../../server') ;


class Provider extends ServiceProvider {
  /**
   * Register namespaces to the IoC container
   *
   * @method register
   *
   * @return {void}
   */
  register () {
    this.app.singleton('Elastic/Elastic' , () => {
      return new Elastic() ;
    }) ;

    this.app.singleton('Elastic/APM' , () => {
      // make new apm
      let apm_provider = new APM() ;
      apm_provider.setApm(apm)
      return apm_provider ;
    }) ;
  }

  /**
   * Attach context getter when all providers have
   * been registered
   *
   * @method boot
   *
   * @return {void}
   */
  boot () {
  }
}

module.exports = Provider
