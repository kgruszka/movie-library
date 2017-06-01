/* global describe, it */
'use strict'
const { assert } = require('chai')
const moviesRouter = require('./movies')
const { test: isRouteRegistered } = require('../../../utils')

describe('movies v1 router', function () {
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
