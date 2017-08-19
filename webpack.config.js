const path = require('path')
const webpack = require('webpack')

module.exports = {
  entry: {
    index: './src/index.js',
    url: './src/url.js'
  },
  output: {
    path: path.resolve(__dirname, 'public'),
    filename: '[name].js'
  },
  plugins: [
    new webpack.optimize.ModuleConcatenationPlugin()
  ]
}
