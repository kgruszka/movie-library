'use strict'
const express = require('express')

function MovieRouter (movieController) {
  const router = express.Router()

  router.get('/', movieController.getAll)
  router.post('/', movieController.create)
  router.get('/:id', movieController.getById)
  router.delete('/:id', movieController.deleteById)

  return router
}

module.exports = (movieController) => {
  return MovieRouter(movieController)
}
