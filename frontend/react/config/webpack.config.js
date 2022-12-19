const path = require('path') 
const TerserPlugin = require('terser-webpack-plugin')  // already in webpack 5 
const MiniCssExtractPlugin = require("mini-css-extract-plugin"); 
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");




console.log('initializing webpack ....')
module.exports = {
  entry: {
    bundle: path.resolve( "./src/index.js"),
  },
  output: {
    filename: '[name].[contenthash].js',
    path: path.resolve(__dirname,'../dist/'),
    publicPath: '', // already automamted in webpack 5
    assetModuleFilename: 'assets/[name][ext]', // to customize output of asset/resource see link for reference https://webpack.js.org/guides/asset-modules/,
    clean: {
      dry: true, //webpack will inform which files to remove
      // keep: /\.css/ //Informs webpack what to preserve before removing other files ex. preserve all .css files
    },  // Another alternative for clean-webpack-plugin // available for webpack >= 5.20
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
      {
        test: /\.hbs$/,
        use: ['handlebars-loader'],
      },      
    ]
  },
  plugins : [
    new TerserPlugin(), // minimize bundle.js
    new MiniCssExtractPlugin({
      // bundles css file
      filename: "bundles.[contenthash].css", // purpose of contentHash is for browser caching purposes
      // chunkFilename: "[id].css"
    }),
    new CleanWebpackPlugin({
      cleanOnceBeforeBuildPatterns: [
        '**/*', //format for deleting files and subfolders default locations is based on output path
        path.join(process.cwd(), 'build/**/*') // format for deleting files on other folders 
      ]
    }),
    new HtmlWebpackPlugin({
      //#region generates index.html file inside folder declared earlier on output
      title: " Custom Title",
      filename:"index.html",
      meta: {
        description: "Some Description",
        random1: "Another Description"
      },
      personalDescription: "My Personal Description",
      template: "template.hbs", //would still generate index.html even without template this is just for further customization
      //#endregion
    }),

  ]  


  
}