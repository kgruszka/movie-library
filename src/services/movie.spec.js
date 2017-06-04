/* global describe, it */
'use strict'
const { assert } = require('chai')
const sinon = require('sinon')
const fixtures = require('../utils/fixtures')
const MovieService = require('./movie')

describe('movie service module', function () {
  describe('#getAll', function () {
    it('resolves with array of all movie items', async function () {
      // GIVEN
      const movieFixtures = fixtures.movies.load()
      const fakeMovieModel = {}
      fakeMovieModel.getAll = sinon.stub().resolves(movieFixtures)
      const movieService = MovieService(fakeMovieModel)
      // WHEN
      const movies = await movieService.getAll()
      // THEN
      assert.deepEqual(movies, movieFixtures)
    })
  })

  describe('#create', function () {
    it('resolves with id of created movie item', async function () {
      // GIVEN
      const movieFixtures = fixtures.movies.load()
      const movie = movieFixtures[0]
      const expectedMovieId = movie._id
      delete movie._id
      const fakeMovieModel = {}
      fakeMovieModel.save = sinon.stub().withArgs(movie).resolves(expectedMovieId)
      const movieService = MovieService(fakeMovieModel)
      // WHEN
      const movieId = await movieService.create()
      // THEN
      assert.strictEqual(movieId, expectedMovieId)
    })
  })

  describe('#getById', function () {
    it('resolves with a movie item', async function () {
      // GIVEN
      const movieFixtures = fixtures.movies.load()
      const expectedMovie = movieFixtures[0]
      const fakeMovieModel = {}
      fakeMovieModel.getById = sinon.stub().withArgs(expectedMovie._id).resolves(expectedMovie)
      const movieService = MovieService(fakeMovieModel)
      // WHEN
      const movie = await movieService.getById(expectedMovie._id)
      // THEN
      assert.strictEqual(movie, expectedMovie)
    })
  })

  describe('#deleteById', function () {
    it('resolves with success', async function () {
      // GIVEN
      const movieFixtures = fixtures.movies.load()
      const movieId = movieFixtures[0]._id
      const fakeMovieModel = {}
      fakeMovieModel.deleteById = sinon.stub().withArgs(movieId).resolves(true)
      const movieService = MovieService(fakeMovieModel)
      // WHEN
      const success = await movieService.deleteById(movieId)
      // THEN
      assert.isTrue(success)
    })
  })
})
