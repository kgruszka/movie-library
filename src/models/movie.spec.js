/* global describe, it */
'use strict'
const { assert } = require('chai')
const sinon = require('sinon')
const createMovieModel = require('./movie')
const fixtures = require('../utils/fixtures')

function createFakeDbWithCollection (collectionName) {
  const collection = sinon.stub()
  collection.withArgs(collectionName).returns({})

  return {
    collection
  }
}

describe('movie model', function () {
  describe('#getAll', function () {
    it('resolves with an array of all movie items from db', async function () {
      // GIVEN
      const movieFixtures = fixtures.movies.load()
      const fakeCursor = {
        toArray: sinon.stub().resolves(movieFixtures)
      }
      const db = createFakeDbWithCollection('movies')
      db.collection('movies').find = sinon.stub().withArgs({}).returns(fakeCursor)
      const Movie = createMovieModel(db)
      // WHEN
      const result = await Movie.getAll()
      // THEN
      assert.deepEqual(result, movieFixtures)
    })
  })

  describe('#save', function () {
    it('resolves with id of the saved movie item', async function () {
      // GIVEN
      const movieFixtures = fixtures.movies.load()
      const movie = movieFixtures[0]
      const expectedMovieId = movie._id
      delete movie._id
      const db = createFakeDbWithCollection('movies')
      db.collection('movies').insertOne = sinon.stub().withArgs(movie).resolves(expectedMovieId)
      const Movie = createMovieModel(db)
      // WHEN
      const movieId = await Movie.save(movie)
      // THEN
      assert.strictEqual(movieId, expectedMovieId)
    })
  })
})
