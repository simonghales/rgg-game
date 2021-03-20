
'use strict'

if (process.env.NODE_ENV === 'production') {
  module.exports = require('./rgg-editor.cjs.production.min.js')
} else {
  module.exports = require('./rgg-editor.cjs.development.js')
}
