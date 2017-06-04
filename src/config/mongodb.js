'use strict'

const configs = {
  test: {
    host: process.env.MONGO_HOST || 'localhost',
    port: process.env.MONGO_PORT || 27017,
    dbName: 'test'
  },
  development: {
    host: process.env.MONGO_HOST || 'localhost',
    port: process.env.MONGO_PORT || 27017,
    dbName: process.env.MONGO_DB_NAME || 'movie-library'
  },
  production: {
    host: process.env.MONGO_HOST,
    port: process.env.MONGO_PORT,
    dbName: process.env.MONGO_DB_NAME
  }
}

const env = process.env.NODE_ENV

if (!env) throw Error('NODE_ENV not defined.')

const config = configs[env]

if (!config.host || !config.port) throw Error('MongoDB configuration error. Host/Port not specified.')

module.exports = {
  getUrl: (dbName = '') => {
    if (typeof dbName !== 'string') throw Error('Mongodb configuration error. Database name must be a string.')
    if (!dbName) dbName = config.dbName
    return `mongodb://${config.host}:${config.port}/${dbName}`
  }
}
