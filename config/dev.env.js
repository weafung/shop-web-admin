'use strict'
const merge = require('webpack-merge')
const prodEnv = require('./prod.env')

module.exports = merge(prodEnv, {
  NODE_ENV: '"development"',
  API_ROOT: '"http://192.168.1.212:8080/"',
  UPLOAD_IMAGE_URL: '"http://url.w2fzu.com/upload.php"'
})
