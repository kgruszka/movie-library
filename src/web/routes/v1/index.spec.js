/* global describe, it */
'use strict'
const { assert } = require('chai')
const router = require('.')
const moviesRouter = require('./movies')
const { test: { isRouterRegistered, isExpressRouter } } = require('../../../utils')

describe('v1 router', function () {
  describe('module', function () {
    it('exports express.Router instance', function () {
      assert.isTrue(isExpressRouter(moviesRouter))
    })
  })

  describe('"/movies"', function () {
    it('registers movies router', function () {
      // GIVEN
      const path = '/movies'
      const subRouter = moviesRouter
      // WHEN
      const isRegistered = isRouterRegistered(router, {path, subRouter})
      // THEN
      assert.isTrue(isRegistered)
    })
  })
})
