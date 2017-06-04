'use strict'

function MovieService (db) {
  async function getAll () {
    return db.getAll()
  }

  async function create (movie) {
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

module.exports = function (db) {
  return MovieService(db)
}
