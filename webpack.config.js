const path = require('path')
const webpack = require('webpack')

module.exports = {
  entry: './src/index.js',
  output: {
    filename: 'index.js',
    path: path.resolve(__dirname, 'public')
  },
  plugins: [
    new webpack.optimize.ModuleConcatenationPlugin()
  ]
}
