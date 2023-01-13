const HtmlWebPackPlugin = require('html-webpack-plugin');
const path = require('path');

module.exports = {
  mode:'development',
  entry: './src/index.js',
  output: {
    clean:true,
    path: path.resolve(__dirname, './dist'),
    filename: 'main.js',
  },
  plugins: [new HtmlWebPackPlugin({
    template:'src/index.html',
  }
  )],
};