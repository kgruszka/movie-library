'use strict'
function Movie (db) {
  const moviesCollection = db.collection('movies')

  async function getAll () {
    return moviesCollection.find({}).toArray()
  }

  async function save (movie) {
    const result = await moviesCollection.insertOne(movie)
    return result.insertedId
  }

  async function getById (id) {
    return moviesCollection.findOne({_id: id})
  }

  async function deleteById (id) {
    const result = await moviesCollection.deleteOne({_id: id})
    return result.deletedCount === 1
  }

  return {
    getAll,
    save,
    getById,
    deleteById
  }
}

module.exports = function (db) {
  return Movie(db)
}
