'use strict'
const errors = require('./errors')
const ALLOWED_SORT_FIELDS = ['category']
const { validateMovie } = require('./schemas/validator')

function MovieService (db) {
  async function getAll (options) {
    validateGetAllOptions(options)
    return db.getAll(options)
  }

  async function create (movie) {
    if (!validateMovie(movie)) throw new errors.InvalidMovieSchemaError(validateMovie.errors)
    return db.save(movie)
  }

  async function getById (movieId) {
    return db.getById(movieId)
  }

  async function deleteById (movieId) {
    return db.deleteById(movieId)
  }

  return {
    getAll,
    create,
    getById,
    deleteById
  }
}

function validateGetAllOptions ({sortBy} = {}) {
  if (sortBy && sortBy.field) {
    const valid = ALLOWED_SORT_FIELDS.some(field => field === sortBy.field)
    if (!valid) throw new errors.InvalidSortByParameterError(sortBy)
  }
}

module.exports = function (db) {
  return MovieService(db)
}
