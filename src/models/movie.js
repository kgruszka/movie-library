'use strict'
function Movie (db) {
  const moviesCollection = db.collection('movies')

  async function getAll () {
    return moviesCollection.find({}).toArray()
  }
  return {
    getAll
  }
}

module.exports = function (db) {
  return Movie(db)
}
