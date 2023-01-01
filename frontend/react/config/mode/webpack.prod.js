const common = require('../webpack.config.js')
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin
const CompressionPlugin = require('compression-webpack-plugin');
const { merge } = require('webpack-merge')

console.log('Running Production')

module.exports = merge(common, {
  plugins: [
    new BundleAnalyzerPlugin({
      analyzerMode: 'server',
      openAnalyzer: true
    }),
    new CompressionPlugin({
      algorithm: "gzip",
      test: /\.(js\css)$/,
      filename: '[path].gz[query]'
      
    }),
    new CompressionPlugin({
      filename: '[path][base].br',  
      algorithm: "brotliCompress",
      test: /\.(js\css)$/,
      compressionOptions: { level: 11},       
    })
  ]
  
})
