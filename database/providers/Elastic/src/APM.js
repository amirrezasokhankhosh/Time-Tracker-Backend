'use strict'

class APM {

  // the apm object
  apm ;

  setApm(apm) {
    this.apm = apm ;
  }

  getApm() {
    return this.apm ;
  }

  /**
   * make simple transaction method
   * @param {string} name - name of the transaction
   * @param {string} type - type of the transaction
   */
  makeTransaction(name , type) {
    let tran = this.apm.startTransaction(name, type) ;
    tran.end('request end') ;
  }

}

module.exports = APM ;
