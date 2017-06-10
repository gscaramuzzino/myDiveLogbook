const webpack = require("webpack");
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require("extract-text-webpack-plugin");
const path = require('path');
const bootstrapEntryPoints = require("./webpack.bootstrap.config");
const glob = require('glob');
const PurifyCSSPlugin = require('purifycss-webpack');

const isProduction = process.env.NODE_ENV === 'production';
const distFolder = process.env.NODE_ENV === 'integration' ? '../rest-server/public/' : './dist';
const cssDev = ['style-loader', 'css-loader', 'sass-loader'];
const cssProd = ExtractTextPlugin.extract({ //module to compile e load css and sass
  fallback: 'style-loader',
  loader: ['css-loader', 'sass-loader'],
  publicPath: './'
});

const cssConfig = isProduction ? cssProd : cssDev;

const bootstrapConfig = isProduction ? bootstrapEntryPoints.prod : bootstrapEntryPoints.dev;

module.exports = {
  entry: {
    bootstrap: bootstrapConfig,
    app: './src/app.js'
  },
  output: {
    path: path.resolve(__dirname, distFolder),
    filename: 'js/[name].[hash].js'
  },
  module: {
    rules: [{
        test: /bootstrap-sass[\/\\]assets[\/\\]javascripts[\/\\]/,
        loader: 'imports-loader?jQuery=jquery'
      },
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: [{
          loader: 'ng-annotate-loader',
          options: {
            add: false,
            map: false,
          }
        }]
      },
      {
        test: /\.(gif|png|ico|jpe?g|svg)$/i,
        use: ['file-loader?name=images/[name].[ext]'] // 'image-webpack-loader']
      },
      {
        test: /\.(html)$/i,
        exclude: /index.html/,
        use: ['file-loader?name=views/[name].[ext]'] // 'image-webpack-loader']
      },
      {
        test: /\.(woff2?|svg)$/,
        loader: 'url-loader?limit=10000&name=fonts/[name].[ext]'
      },
      {
        test: /\.(ttf|eot)$/,
        loader: 'file-loader?name=fonts/[name].[ext]'
      },
      {
        test: /\.scss$/,
        use: cssConfig
      },
      {
        test: /\.js$/, // Check for all js files
        exclude: /node_modules/,
        use: [{
          loader: 'babel-loader',
          options: {
            presets: ['es2015']
          }
        }]
      }
    ]
  },
  devServer: {
    contentBase: path.join(__dirname, "dist"),
    compress: true,
    port: 9000,
    stats: "errors-only",
    hot: true,
    open: true //reload browser
  },
  plugins: [new webpack.ProvidePlugin({
      $: 'jquery',
      jQuery: 'jquery'
    }),
    new webpack.optimize.CommonsChunkPlugin({
      name: 'vendor',
      minChunks: function (module) {
        // this assumes your vendor imports exist in the node_modules directory
        return module.context && module.context.indexOf('node_modules') !== -1;
      },
      minChuncks: Infinity
    }),
    new webpack.optimize.CommonsChunkPlugin({
      name: 'manifest' //But since there are no more common modules between them we end up with just the runtime code included in the manifest file
    }),
    new HtmlWebpackPlugin({ //plugins to add js in index.html
      title: 'My Dive Logbook',
      minify: {
        collapseWhitespace: true
      },
      hash: true,
      excludeChunks: ['contact'],
      //filename: './../index.html',
      template: './src/index.html'
    }),
    new ExtractTextPlugin({ //plugins to add app.css in index.html with all style
      filename: 'css/[name].css',
      disable: !isProduction,
      allChunks: true
    }),
    // Make sure this is after ExtractTextPlugin!
    /*new PurifyCSSPlugin({
      // Give paths to parse for rules. These should be absolute!
      paths: glob.sync(path.join(__dirname, 'src/*.html')),
    }),*/
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NamedModulesPlugin()
  ],
  stats: {
    colors: true
  },
  devtool: 'source-map'
}