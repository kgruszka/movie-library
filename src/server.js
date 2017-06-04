'use strict'
const db = require('./db')
const web = require('./web')
const http = require('http')
const config = require('./config')
const models = require('./models')
const services = require('./services')

db.connect()
  .then(conn => {
    const movieModel = models.createMovieModel(conn)
    const movieService = services.createMovieService(movieModel)

    const app = web.createWebApp(movieService)
    const port = config.server.getPort()
    app.set('port', port)

    const server = http.createServer(app)
    server.listen(port)
    server.on('error', onError)
    server.on('listening', onListening)

    function onError (error) {
      if (error.syscall !== 'listen') {
        throw error
      }

      const bind = typeof port === 'string'
        ? 'Pipe ' + port
        : 'Port ' + port

      // handle specific listen errors with friendly messages
      switch (error.code) {
        case 'EACCES':
          console.error(bind + ' requires elevated privileges')
          process.exit(1)
        case 'EADDRINUSE':
          console.error(bind + ' is already in use')
          process.exit(1)
        default:
          throw error
      }
    }

    function onListening () {
      const addr = server.address()
      const bind = typeof addr === 'string'
        ? 'pipe ' + addr
        : 'port ' + addr.port
      console.log(`Server listening on ${bind}`)
    }
  })
  .catch(err => {
    console.log(err)
  })
