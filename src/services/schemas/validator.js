'use strict'
const Ajv = require('ajv')
const ajv = new Ajv()
const movieSchema = require('./movie.schema.json')

const validateMovie = ajv.compile(movieSchema)

module.exports = {
  validateMovie
}
