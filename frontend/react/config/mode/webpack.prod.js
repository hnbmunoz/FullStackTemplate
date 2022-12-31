const common = require('../webpack.config.js')
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin
const { merge } = require('webpack-merge')

console.log('Running Production')

module.exports = merge(common, {
  plugins: [
    new BundleAnalyzerPlugin({
      analyzerMode: 'server',
      openAnalyzer: true
    })
  ]
  
})
