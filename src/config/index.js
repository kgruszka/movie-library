'use strict'
// This must be executed before importing config modules
if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config()
}

const server = require('./server')
const mongodb = require('./mongodb')

module.exports = {
  server,
  mongodb
}
