/* global describe, it */
'use strict'
const { assert } = require('chai')
const sinon = require('sinon')
const createMovieModel = require('./movie')
const fixtures = require('../utils/fixtures')

function createFakeDbWithCollection (collectionName) {
  const collection = sinon.stub()
  const find = sinon.stub()
  collection.withArgs(collectionName).returns({
    find
  })

  return {
    collection
  }
}

describe('movie model', function () {
  describe('#getAll', function () {
    it('resolves with an array of all movie items from db', async function () {
      // GIVEN
      const movies = fixtures.movies.load()
      const fakeCursor = {
        toArray: sinon.stub().resolves(movies)
      }
      const db = createFakeDbWithCollection('movies')
      db.collection('movies').find.withArgs({}).returns(fakeCursor)
      const Movie = createMovieModel(db)
      // WHEN
      const result = await Movie.getAll()
      // THEN
      assert.deepEqual(result, movies)
    })
  })
})
