const path = require('path');
const CleanWebpackPlugin = require('clean-webpack-plugin');

function resolve(pathPart) {
  return path.join(__dirname, pathPart);
}

module.exports = {
  // context: resolve('src'),
  entry: {
    jsonp: '/Users/liu/Desktop/github/es6jsonp/src/index.js',
  },
  devtool: 'source-map',
  output: {
    path: resolve('./dist'),
    filename: '[name].js',
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        use: 'babel-loader',
      },
    ],
  },
  plugins: [
    new CleanWebpackPlugin([resolve('dist')]),
  ],
};
