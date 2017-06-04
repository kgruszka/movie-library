'use strict'
const express = require('express')

function MovieRouter (controller) {
  const router = express.Router()

  router.get('/', controller.getAll)

  return router
}

module.exports = (controller) => {
  return MovieRouter(controller)
}
