// const path = require('path');
// const NodePolyfillPlugin = require('node-polyfill-webpack-plugin');

module.exports = {
  // entry: './src/index.js',
  // output: {
  //   filename: 'main.js',
  //   path: path.resolve(__dirname, 'dist'),
  // },

  target: 'node',
  mode: 'development',
  // mode: 'production',

  // plugins: [
  //   new NodePolyfillPlugin()
  // ]
  // resolve: {
  //   alias: {
  //     fs: require.resolve('fs')
  //   }
  // }
};

// import path from 'path';

// const __dirname = path.dirname(__filename);

// export default {
//   entry: './src/index.js',
//   output: {
//     filename: 'main.js',
//     path: path.resolve(__dirname, 'dist'),
//   },
// };
