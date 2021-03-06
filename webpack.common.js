const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const VueLoaderPlugin = require('vue-loader/lib/plugin');

module.exports = {
  resolve: {
    alias: {
      '@': path.resolve(__dirname, 'src/'),
      'Components': path.resolve(__dirname, 'src/components/'),
      'Views': path.resolve(__dirname, 'src/views/'),
      'Utils': path.resolve(__dirname, 'src/utils/'),
    },
    extensions: [
      '.vue', 
      '.js',
    ],
  },
  module: {
    rules: [
      {
        test: /\.(png|svg|jpg|gif)$/,
        use: [
          'file-loader',
        ],
      },
      {
        test: /\.vue$/,
        loader: 'vue-loader'
      },
    ],
  },
  plugins: [
    new CleanWebpackPlugin(['dist']),
    new HtmlWebpackPlugin({
      title: 'CRUD',
      template: 'public/index.html',
    }),
    new VueLoaderPlugin(),
  ]
};
