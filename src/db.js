'use strict'
const { MongoClient } = require('mongodb')
const config = require('./config')

exports.connect = () => {
  const url = config.mongodb.getUrl()
  return MongoClient.connect(url)
}
