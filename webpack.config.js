const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const UglifyJSWebpackPlugin = require('uglifyjs-webpack-plugin');

const isProductionMode = process.env.NODE_ENV === 'production';

const config = {
  entry: path.resolve(__dirname, './src/js/index.js'),
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'bundle.[hash].js',
  },

  module: {
    rules: [
      {
        test: /\.(sa|sc|c)ss$/,
        use: ['style-loader', 'css-loader', 'sass-loader'],
      },
      {
        test: /\.(svg|jpg|jpeg|png|gif)$/,
        use: {
          loader: 'file-loader',
          options: {
            name: '[name].[hash].[ext]',
            outputPath: './img',
          },
        },
      },
      {
        test: /\.(js)$/,
        exclude: '/node_modules',
        use: 'babel-loader',
      },
    ],
  },
  plugins: [
    new CleanWebpackPlugin({
      cleanAfterEveryBuildPatterns: ['**/*'],
    }),
    new HtmlWebpackPlugin({
      title: 'TODO Aplication',
      template: './src/index.html',
    }),

    new UglifyJSWebpackPlugin(),
  ],
  mode: isProductionMode ? 'production' : 'development',
  devtool: isProductionMode ? 'source-map' : 'cheap-module-eval-source-map',
  devServer: {
    contentBase: path.join(__dirname, 'dist'),
    // hot: true,
    watchContentBase: true,
  },
};
module.exports = config;
