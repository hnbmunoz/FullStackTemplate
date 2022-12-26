const common = require('../webpack.config.js')
const path = require('path') 
const { merge } = require('webpack-merge')
console.log('Running Development')

module.exports = merge(common, {
  devServer: {
    port: 5000,
    // proxy: {
    //   "/": {
    //       target: "http://localhost:3000",
    //       secure: false,
    //       changeOrigin: true
    //   }
    // },
    static: {
      directory: path.resolve(__dirname, '../dist'),
    },
    devMiddleware: {
      index: 'index.html',
      writeToDisk: true
    }, 
    client: {
      overlay: true
    },
    liveReload: false, // set to false since hot reload will be used instead  
    open: true,
    // hot: true, // hot reloading // another option is to add --hot on package.json

  },
  
})
