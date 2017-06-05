'use strict'
const { VError } = require('verror')

class InvalidSortByParameterError extends VError {
  constructor (value) {
    const options = {
      name: 'InvalidSortByParameterError',
      info: {
        value
      }
    }
    super(options, `Invalid 'sortBy' parameter value.`)
  }
}

module.exports = InvalidSortByParameterError
