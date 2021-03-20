
'use strict'

if (process.env.NODE_ENV === 'production') {
  module.exports = require('./rgg-engine.cjs.production.min.js')
} else {
  module.exports = require('./rgg-engine.cjs.development.js')
}
