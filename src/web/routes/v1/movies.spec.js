/* global describe, it */
'use strict'
const { assert } = require('chai')
const moviesRouter = require('./movies')
const { test: { isRouteRegistered, isExpressRouter } } = require('../../../utils')

describe('movies v1 router', function () {
  describe('module', function () {
    it('exports express.Router instance', function () {
      assert.isTrue(isExpressRouter(moviesRouter))
    })
  })

  describe('"/"', function () {
    it('registers GET handler', function () {
      // GIVEN
      const path = '/'
      const method = 'get'
      // WHEN
      const isRegistered = isRouteRegistered(moviesRouter, {path, method})
      // THEN
      assert.isTrue(isRegistered)
    })
  })
})
