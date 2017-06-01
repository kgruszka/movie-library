'use strict'

const configs = {
  test: {
    host: process.env.MONGO_HOST || 'localhost',
    port: process.env.MONGO_PORT || 27017
  },
  development: {
    host: process.env.MONGO_HOST || 'localhost',
    port: process.env.MONGO_PORT || 27017
  },
  production: {
    host: process.env.MONGO_HOST,
    port: process.env.MONGO_PORT
  }
}

const env = process.env.NODE_ENV

if (!env) throw Error('NODE_ENV not defined.')

const config = configs[env]

if (!config.host || !config.port) throw Error('MongoDB configuration error. Host/Port not specified.')

module.exports = {
  getUrl: (dbName) => {
    if (typeof dbName !== 'string') throw Error('Mongodb configuration error. Database name must be a string.')
    return `mongodb://${config.host}:${config.port}/${dbName}`
  }
}
