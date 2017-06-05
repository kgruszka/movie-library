'use strict'
const { VError } = require('verror')

class InvalidMovieSchemaError extends VError {
  constructor (value) {
    const options = {
      name: 'InvalidMovieSchemaError',
      info: {
        value
      }
    }
    super(options, `Invalid movie schema.`)
  }
}

module.exports = InvalidMovieSchemaError
