'use strict'
function Movie (db) {
  const moviesCollection = db.collection('movies')

  async function getAll () {
    return moviesCollection.find({}).toArray()
  }

  async function save (movie) {
    return moviesCollection.insertOne(movie)
  }

  return {
    getAll,
    save
  }
}

module.exports = function (db) {
  return Movie(db)
}
