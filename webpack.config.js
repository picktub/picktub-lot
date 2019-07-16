const path = require('path');

const { CleanWebpackPlugin } = require('clean-webpack-plugin');

const libraryName = 'picktubLot';

module.exports = {
  entry: {
    index: './index.js',
  },
  output: {
    filename: '[name].js',
    path: path.resolve(__dirname, 'dist'),
    library: libraryName,
    libraryTarget: 'umd',
    globalObject: '(typeof self !== \'undefined\' ? self : this)',
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_module/,
        use: 'babel-loader',
      },
    ],
  },
  plugins: [
    new CleanWebpackPlugin(),
  ],
  mode: 'production',
};
