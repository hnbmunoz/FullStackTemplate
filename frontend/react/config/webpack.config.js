const path = require('path') 
const TerserPlugin = require('terser-webpack-plugin')  // already in webpack 5 
const MiniCssExtractPlugin = require("mini-css-extract-plugin"); 
const CSSMinimizerPlugin = require("css-minimizer-webpack-plugin");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");

console.log('initializing webpack ....')

module.exports = {
  entry: {
    'bundle': path.resolve( "./src/index.tsx"),
  },
  output: {
    filename: '[name].[contenthash].js',
    path: path.resolve(__dirname,'../dist/'),
    publicPath: '', // already automamted in webpack 5
    assetModuleFilename: 'assets/[name].[contenthash][ext]', // to customize output of asset/resource see link for reference https://webpack.js.org/guides/asset-modules/,
    clean: {
      dry: true, //webpack will inform which files to remove
      // keep: /\.css/ //Informs webpack what to preserve before removing other files ex. preserve all .css files
    },  // Another alternative for clean-webpack-plugin // available for webpack >= 5.20
  },
  devtool: 'source-map',
  resolve: {
    extensions: ['.tsx', '.ts', '.jsx', '.js'] 
  },
  optimization: {
    usedExports: true,
    runtimeChunk: 'single',
    splitChunks: {
      chunks: 'all', // 
      minSize: 0, // 3kb default is 30kb,
      maxSize: Infinity,
      //////////////Make Chunk Bundles Have Readable  Names/////////////////////
      // name(module, chunks, cacheGroupKey) {
      //   const filePathAsArray = module
      //     .identifier()
      //   return filePathAsArray[filePathAsArray.length - 1 ]
      // },
      //////////////Make Chunk Bundles Have Readable  Names/////////////////////

      ///////////////Customizing CHunk Bundles///////////////////////////////////////////////////
      cacheGroups:{
        jquery: {
          test: /[\\/]node_modules[\\/]jquery[\\/]/,
          name: 'jquery',
          priority: 2
        },
        bootstrap: {
          test: /[\\/]node_modules[\\/]bootstrap[\\/]/,
          name: 'bootstrap',
          priority: 2
        },
        lodash: {
          test: /[\\/]node_modules[\\/]lodash-es[\\/]/,
          name: 'lodash-es',
          priority: 2
        },
        node_modules: {
          test: /[\\/]node_modules[\\/]/,
          name(module) {
              const packageName = module.context.match(/[\\/]node_modules[\\/](.*?)([\\/]|$)/)[1];
              return packageName;
          },
        },        
        async: {
          test: /[\\/]node_modules[\\/]/,
          chunks: 'async',
        }
      }
      ///////////////Customizing CHunk Bundles///////////////////////////////////////////////////
    },
    minimize: true,
    minimizer: [
      '...', //tells web pack to add minimizers not overwrite 
      new CSSMinimizerPlugin({
        minimizerOptions: {
          preset: [
            'default',
            {
              discardComments: {removeAll: true}
            }
          ]
        }
      })
    ]
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
        },
        use: [
          {
            loader: 'image-webpack-loader',
            options: {
              mozjpeg: {
                quality: 40 // refers to compression quality
              },
              pngquant: {
                quality: [0.65, 0.9], // refers to min max compression quality
                speed: 4 // default is 4 but can still be adjusted the speed of compression
              },
              gifsicle: {
                interlaced: false,
              },
              webp: {
                quality: 75
              }
            }
          }
        ]

      },
      {
        test: /\.txt/,
        type: 'asset/source' 
      },
      {
        // test: /\.(css|scss)$/,
        test: /\.scss$/,
        exclude: /\.module\.css$/,
        use: [
          // 'style-loader', // creates style nodes from JS strings
          MiniCssExtractPlugin.loader,
          'css-loader',  // translates CSS into CommonJS
          'sass-loader',  // compiles Sass to CSS, using Node Sass by default
          // npm install sass in case sass-loader is making errors https://stackoverflow.com/questions/54045869/npm-run-cannot-find-module-sass-after-repeated-reinstall-attempts
        ]
      },
      {
        test: /\.css$/,
        include: /\.module\.css$/,
        use: [
          // 'style-loader',
          MiniCssExtractPlugin.loader,
          {
            loader: 'css-loader',
            options: {
              //allows webpack to enable css modules 
              modules: {
                localIdentName: '[hash:base64]'// makes class names in production unreadable
                // localIdentName: '[local]--[md:hash:7]' // makes class names readable suggested for development mode
              } 
            }
          }

        ]
      },
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
          options: {
            presets: ["@babel/preset-react"],
            plugins:[ "@babel/plugin-proposal-class-properties"]
          }
        },
      },
      {
        test: /\.(ts|tsx)$/,
        exclude: /node_modules/,
        use: {
          loader: "ts-loader",         
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
      title: "Custom Title",
      filename:"index.html", //default is index.html use filename just incase of MPA 
      chunks: ['bundle'],// defines which bundle to put on html generally used for MPA ref is naming in entry obj
      meta: {
        description: "Some Description",
        random1: "Another Description"
      },
      personalDescription: "My Personal Description",
      template: "template.hbs", //would still generate index.html even without template this is just for further customization
      //#endregion
      favicon: 'src/assets/public/favicon.ico',
      minify: true
    }),

  ]  


  
}