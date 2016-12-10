var webpack = require('webpack');

module.exports = {
  entry: './src/index.js',
  output: {
    path:'dist',
    filename: 'bundle.js'       
  },
  module:{
    loaders: [
      { test: /\.js$/, exclude: /node_modules/, loader: "babel-loader"},
      {test: /\.css?$/,loaders: ["style-loader","css-loader"],include: __dirname}
    ]
  },
  resolve: {
    extensions: ['','.js']
  },
  plugins:[
  ]
}