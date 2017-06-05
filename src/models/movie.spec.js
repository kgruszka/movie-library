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
      const result = {
        insertedId: expectedMovieId
      }
      db.collection('movies').insertOne = sinon.stub().withArgs(movie).resolves(result)
      const Movie = createMovieModel(db)
      // WHEN
      const movieId = await Movie.save(movie)
      // THEN
      assert.strictEqual(movieId, expectedMovieId)
    })
  })

  describe('#getById', function () {
    it('resolves with movie item', async function () {
      // GIVEN
      const movieFixtures = fixtures.movies.load()
      const expectedMovie = movieFixtures[0]
      const db = createFakeDbWithCollection('movies')
      db.collection('movies').findOne = sinon.stub().withArgs({_id: expectedMovie._id}).resolves(expectedMovie)
      const Movie = createMovieModel(db)
      // WHEN
      const movie = await Movie.getById(expectedMovie._id)
      // THEN
      assert.strictEqual(movie, expectedMovie)
    })
  })

  describe('#deleteById', function () {
    it('resolves with true if deleted correctly', async function () {
      // GIVEN
      const movieFixtures = fixtures.movies.load()
      const movieId = movieFixtures[0]._id
      const db = createFakeDbWithCollection('movies')
      db.collection('movies').deleteOne = sinon.stub().withArgs({_id: movieId}).resolves({deletedCount: 1})
      const Movie = createMovieModel(db)
      // WHEN
      const success = await Movie.deleteById(movieId)
      // THEN
      assert.isTrue(success)
    })

    it('resolves with false if object not found', async function () {
      // GIVEN
      const movieId = 'kjh1244dj20z8m3x39dk20da'
      const db = createFakeDbWithCollection('movies')
      db.collection('movies').deleteOne = sinon.stub().withArgs({_id: movieId}).resolves({deletedCount: 0})
      const Movie = createMovieModel(db)
      // WHEN
      const success = await Movie.deleteById(movieId)
      // THEN
      assert.isFalse(success)
    })
  })
})
