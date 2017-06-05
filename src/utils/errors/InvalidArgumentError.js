'use strict'
const { VError } = require('verror')

class InvalidArgumentError extends VError {
  constructor (...args) {
    const options = {
      name: 'InvalidArgumentError',
      info: {
        invalidArguments: arguments
      }
    }
    super(options)
  }
}

module.exports = InvalidArgumentError
