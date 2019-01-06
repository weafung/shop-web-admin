'use strict'
const merge = require('webpack-merge')
const devEnv = require('./dev.env')

module.exports = merge(devEnv, {
  NODE_ENV: '"testing"',
  API_ROOT: '"http://localhost:8080/',
  UPLOAD_IMAGE_URL: '"http://url.w2fzu.com/upload_bu_yao_dong.php"'
})
