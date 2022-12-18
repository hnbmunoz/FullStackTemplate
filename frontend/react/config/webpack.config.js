const path = require('path') 
const TerserPlugin = require('terser-webpack-plugin')  

console.log('initializing webpack ....')
module.exports = {
  entry: {
    bundle: path.resolve( "./src/index.js"),
  },
  output: {
    filename: '[name].js',
    path: path.resolve(__dirname,'../dist/'),
    // publicPath: __dirname+'./dist/' // already automamted in webpack 5 
    assetModuleFilename: 'assets/[name][ext]', // to customize output of asset/resource see link for reference https://webpack.js.org/guides/asset-modules/,


  },
  module: {
    rules: [
      {
        test: /\.(png|jpg|jpeg|gif|svg)$/i,  // i to be case insensitive
        type: 'asset',// General asset type let webpack decide either asset/resource or asset/inline  default rule ifFile > 8kb asset/resource ifFile < 8kb asset/inline
        parser: {
          dataUrlCondition: { // Set size configuration on what will webpack select either asset/resource or asset/inline
            maxSize: 10 * 1024 // 10 kilobytes if lesser inline else resource
          }
        }
      },
      {
        test: /\.txt/,
        type: 'asset/source' 
      },
    ]
  } 
  
}