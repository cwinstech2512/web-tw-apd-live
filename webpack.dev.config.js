const path = require('path');
const fs = require('fs');
const webpack = require('webpack');
const HtmlWebpackIncludeAssetsPlugin = require('html-webpack-include-assets-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const WebpackNotifierPlugin = require('webpack-notifier');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const baseConfig = require('./webpack.base.config');
const {
  PROJECT_HOST,
  PROJECT_PORT,
  PROJECT_NAME,
  PROJECT_DESC
} = require('./config/env');
const { FB_APP_ID, SHARE_URL, RSS_LINK } = require('./config/remote');

module.exports = Object.assign(baseConfig, {
  output: {
    path: path.resolve(__dirname, 'output/development'),
    filename: '[name].js',
    publicPath: '/'
  },
  devServer: {
    host: PROJECT_HOST,
    port: PROJECT_PORT,
    hot: true,
    inline: true,
    historyApiFallback: true
  },
  module: {
    loaders: baseConfig.module.loaders.concat([
      {
        test: /\.(s)?css$/,
        loaders: [
          'style-loader',
          'css-loader' +
            '?modules' +
            '&importLoaders=1' +
            '&localIdentName=[path][name]/[local]/[hash:base64:5]' +
            '&-autoprefixer',
          'postcss-loader',
          'sass-loader'
        ],
        exclude: /node_modules/,
        include: path.resolve(__dirname, 'app')
      }
    ])
  },
  plugins: baseConfig.plugins.concat([
    new webpack.NamedModulesPlugin(),
    new webpack.HotModuleReplacementPlugin(),
    new WebpackNotifierPlugin(),
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify(
        process.env.NODE_ENV || 'development'
      )
    }),
    new webpack.optimize.CommonsChunkPlugin({
      name: 'vendor',
      minChunks: module => /node_modules/.test(module.resource)
    }),
    new webpack.optimize.CommonsChunkPlugin({
      name: 'buffer'
    }),
    new webpack.optimize.UglifyJsPlugin({
      // 删除所有的註解
      comments: false,
      compress: {
        // 在UglifyJs删除沒有用到的代碼時不輸出警告
        warnings: false,
        // 删除所有的 `console` 语句
        drop_console: true,
        // 内嵌定义了但是只用到一次的变量
        collapse_vars: true
      }
    }),
    new CopyWebpackPlugin([{ from: 'entrance/fbpic.jpg', to: './' }]),
    new HtmlWebpackPlugin({
      title: PROJECT_NAME,
      desc: PROJECT_DESC,
      fb_appid: FB_APP_ID,
      fb_plugin: `https://connect.facebook.net/zh_TW/sdk.js#xfbml=1&version=v7.0&appId=${FB_APP_ID}&autoLogAppEvents=1`,
      web_url: SHARE_URL,
      rss_link: RSS_LINK,
      fbpic: SHARE_URL + 'fbpic.jpg',
      hash: true,
      cache: true,
      filename: 'index.html',
      favicon: 'app/assets/images/favicon.ico',
      template: 'entrance/index.html'
    }),
    new HtmlWebpackIncludeAssetsPlugin({
      assets: [],
      publicPath: 'js/',
      append: false
    })
  ])
});
