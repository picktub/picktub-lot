const path = require('path');

const { CleanWebpackPlugin } = require('clean-webpack-plugin');

const libraryName = 'main';
const outputFileName = `${libraryName}`;

module.exports = {
  entry: './index.js',
  output: {
    filename: `${outputFileName}.js`,
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
