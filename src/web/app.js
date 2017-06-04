'use strict'
const express = require('express')
const logger = require('morgan')
const bodyParser = require('body-parser')
const routes = require('./routes')
const controllers = require('./controllers')
const cors = require('cors')

function WebApp (movieService) {
  const app = express()
  const movieController = controllers.createMovieController(movieService)
  const movieRouter = routes.createMovieRouter(movieController)

  // basic app config
  app.use(logger('dev'))
  app.use(bodyParser.json())
  app.use(bodyParser.urlencoded({ extended: false }))
  app.options('*', cors())
  app.use(cors())

  // setup routes
  app.use('/api/v1/movies', movieRouter)

  // catch 404 and forward to error handler
  app.use((req, res, next) => {
    const err = new Error('Not Found')
    err.status = 404
    next(err)
  })

  // error handler
  app.use((err, req, res) => {
    // set locals, only providing error in development
    res.locals.message = err.message
    res.locals.error = req.app.get('env') === 'development' ? err : {}

    // send error response
    res.status(err.status || 500)
    res.json({error: err})
  })

  return app
}

module.exports = (services) => {
  return WebApp(services)
}
