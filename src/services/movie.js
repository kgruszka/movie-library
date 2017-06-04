'use strict'

function MovieService (db) {
  async function getAll () {
    return db.getAll()
  }

  return {
    getAll
  }
}

module.exports = function (db) {
  return MovieService(db)
}
