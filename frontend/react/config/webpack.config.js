const path = require('path') 
const TerserPlugin = require('terser-webpack-plugin')  // already in webpack 5 
const MiniCssExtractPlugin = require("mini-css-extract-plugin"); 


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
      {
        test: /\.(css|scss)$/,
        use: [
          // 'style-loader', // creates style nodes from JS strings
          MiniCssExtractPlugin.loader,
          'css-loader',  // translates CSS into CommonJS
          'sass-loader',  // compiles Sass to CSS, using Node Sass by default
          // npm install sass in case sass-loader is making errors https://stackoverflow.com/questions/54045869/npm-run-cannot-find-module-sass-after-repeated-reinstall-attempts
        ]
      },
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
          options: {
            presets: ["@babel/preset-env", "@babel/preset-react"],
            plugins:[ "@babel/plugin-proposal-class-properties"]
          }
        },
      },     
    ]
  },
  plugins : [
    new TerserPlugin(), // minimize bundle.js
    new MiniCssExtractPlugin({
      // bundles css file
      filename: "bundles.css", // purpose of contentHash is for browser caching purposes
      // chunkFilename: "[id].css"
    }),
  ]  


  
}