'use strict'
const { Client } = require('@elastic/elasticsearch')

class Elastic {

  init() {
    this.client = new Client({ node: 'http://127.0.0.1:9200' })
  }

}

module.exports = Elastic ;

