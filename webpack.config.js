const path = require('path');
// const nodeExternals = require('webpack-node-externals');

module.exports = {
  entry: './lib/gdi.ts',
   output: {
     path: path.resolve(__dirname, '.'),
     filename: 'gdi.js'
  },
  mode: 'production',
  devtool: false,
  target: 'node',
  // externals: [nodeExternals({
  //   modulesFromFile: true,
  // })],
  node: {
    __dirname: false,
  },
  resolve: {
    extensions: [".ts", ".tsx", ".js"],
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: 'ts-loader',
        exclude: /node_modules/,
      },
    ],
  },
}