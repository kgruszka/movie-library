/* global describe, it */
'use strict'
const { assert } = require('chai')
const sinon = require('sinon')
const fixtures = require('../utils/fixtures')
const MovieService = require('./movie')

describe('movie service module', function () {
  function createFakeMovieModel (movies) {
    return {
      getAll: sinon.stub().resolves(movies)
    }
  }

  describe('#getAll', function () {
    it('resolves with array of all movie items', async function () {
      // GIVEN
      const movieFixtures = fixtures.movies.load()
      const fakeMovieModel = createFakeMovieModel(movieFixtures)
      const movieService = MovieService(fakeMovieModel)
      // WHEN
      const movies = await movieService.getAll()
      // THEN
      assert.deepEqual(movies, movieFixtures)
    })
  })
})
