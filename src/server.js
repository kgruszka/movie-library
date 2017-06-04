'use strict'
const db = require('./db')
const web = require('./web')
const config = require('./config')
const models = require('./models')
const services = require('./services')

async function createApp () {
  const conn = await db.connect()
  const movieModel = models.createMovieModel(conn)
  const movieService = services.createMovieService(movieModel)

  const app = web.createWebApp(movieService)
  const port = config.server.getPort()
  app.set('port', port)
  return app
}

module.exports = {
  createApp
}
