const path = require('path');
const webpack = require('webpack');
const baseConfig = require('./webpack.base.config');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractCSS = new ExtractTextPlugin('css/app.css');
const ExtractPublic = new ExtractTextPlugin('css/public.css');
const { PROJECT_NAME, PROJECT_DESC } = require('./config/env');
const { FB_APP_ID, SHARE_URL, RSS_LINK } = require('./config/remote');

const publicPath = process.env.PAGE_BASE_PATH || '/web-tw-apd-live/';
const basePlugins = baseConfig.plugins.filter(
  plugin => plugin.constructor.name !== 'BundleAnalyzerPlugin'
);

const htmlOptions = {
  title: PROJECT_NAME,
  desc: PROJECT_DESC,
  fb_appid: FB_APP_ID,
  web_url: SHARE_URL,
  rss_link: RSS_LINK,
  fbpic: `${publicPath}fbpic.jpg`,
  hash: true,
  cache: false,
  favicon: 'app/assets/images/favicon.ico',
  template: 'entrance/index.html'
};

module.exports = Object.assign({}, baseConfig, {
  output: {
    path: path.resolve(__dirname, 'docs'),
    filename: 'js/[name].js',
    publicPath
  },
  module: {
    loaders: baseConfig.module.loaders.concat([
      {
        test: /\.(s)?css$/,
        loader: ExtractPublic.extract({
          fallback: 'style-loader',
          publicPath,
          use: [
            'css-loader?modules&importLoaders=1&localIdentName=[local]-[hash:base64:5]&-autoprefixer',
            'postcss-loader',
            'sass-loader'
          ]
        }),
        exclude: /node_modules/,
        include: path.join(__dirname, 'app/assets')
      },
      {
        test: /\.(s)?css$/,
        loader: ExtractCSS.extract({
          fallback: 'style-loader',
          publicPath,
          use: [
            'css-loader?modules&importLoaders=1&localIdentName=[local]-[hash:base64:5]&-autoprefixer',
            'postcss-loader',
            'sass-loader'
          ]
        }),
        exclude: /node_modules/,
        include: path.join(__dirname, 'app/src')
      }
    ])
  },
  plugins: basePlugins.concat([
    ExtractCSS,
    ExtractPublic,
    new webpack.optimize.UglifyJsPlugin({
      comments: false,
      compress: { warnings: false, drop_console: true, collapse_vars: true }
    }),
    new webpack.optimize.CommonsChunkPlugin({
      name: 'vendor',
      minChunks: module => /node_modules/.test(module.resource)
    }),
    new CopyWebpackPlugin([
      { from: 'entrance/fbpic.jpg', to: './' },
      { from: 'entrance/.nojekyll', to: './' }
    ]),
    new HtmlWebpackPlugin(Object.assign({}, htmlOptions, { filename: 'index.html' })),
    new HtmlWebpackPlugin(Object.assign({}, htmlOptions, { filename: '404.html' }))
  ])
});
