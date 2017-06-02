/* global describe, it */
'use strict'
const { assert } = require('chai')
const utils = require('.')
const testUtils = require('./test')

describe('utils module', function () {
  describe('#test', function () {
    it('is defined property', function () {
      assert.property(utils, 'test')
    })

    it('is a test utils module', function () {
      assert.equal(utils.test, testUtils)
    })
  })
})
