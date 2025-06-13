const merge = require('webpack-merge')
const argv = require('yargs-parser')(process.argv.slice(2))
const _mode = argv.mode || 'development'
const _mergeConfig = require(`./config/webpack.${_mode}.js`)
const _baseConfig = require('./config/webpack.base.js')

module.exports = merge.default(_baseConfig, _mergeConfig)
