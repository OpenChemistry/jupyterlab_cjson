const path = require('path');
const webpack = require('webpack');

module.exports = {
  entry: './src/index.tsx',
  devtool: 'none',
  module: {
    rules: [
      {
        test: /\.js$/,
        use: [
          {
            loader: 'babel-loader'
          }
        ],
        include: ['/node_modules/@openchemistry/',  path.resolve(__dirname, 'src')]
      },
      {
        test: /\.tsx?$/,
        use: 'ts-loader',
        exclude: /node_modules/
      },
      {
        test: /\.css$/,
        use: [
          'to-string-loader',
          'css-loader'
        ],
        exclude: /node_modules/
     }
    ]
  },
  resolve: {
    extensions: [ '.tsx', '.ts', '.js' ]
  },
  plugins: [
    new webpack.optimize.LimitChunkCountPlugin({
      maxChunks: 1,
    }),
  ],
  externals: [
    /^@phosphor\/.+$/,
    /^@jupyterlab\/.+$/,
    /^react$/,
    /^react-dom$/,
    /^jsonpath$/
  ],
  output: {
    filename: 'index.js',
    libraryTarget: 'commonjs2',
    path: path.resolve(__dirname, 'lib')
  }
};
