'use strict'
const { VError } = require('verror')

class InvalidArgumentError extends VError {
  constructor (...args) {
    const error = {
      name: 'InvalidArgumentError',
      info: {
        invalidArguments: arguments
      }
    }
    super(error)
  }
}

module.exports = InvalidArgumentError
