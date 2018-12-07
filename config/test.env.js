'use strict'
const merge = require('webpack-merge')
const devEnv = require('./dev.env')

module.exports = merge(devEnv, {
  NODE_ENV: '"testing"',
  API_ROOT: '"http://localhost:8080/',
  UPLOAD_IMAGE_URL: '"http://localhost:8080/api/upload/image"'
})
