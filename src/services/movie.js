'use strict'

function MovieService (db) {
  async function getAll () {
    return db.getAll()
  }

  async function create (movie) {
    return db.save(movie)
  }

  return {
    getAll,
    create
  }
}

module.exports = function (db) {
  return MovieService(db)
}
