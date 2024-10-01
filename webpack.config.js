const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  entry: './src/index.js',
  devtool: 'source-map',
  output: {
    filename: 'bundle.js',  
    path: path.resolve(__dirname, 'dist'), 
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: './index.html',
    }),
  ],

  mode: 'production',

  module: {
    rules: [
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader'],
      },

      {
        test: /\.(png|svg|jpg|jpeg|gif)$/i,
        type: 'asset/resource',
      },
    ],
  },

  devServer: {
    static: './dist',  
    open: true,        
    port: 9000,        
  },
};