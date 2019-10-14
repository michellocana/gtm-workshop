const path = require('path')

const HtmlWebpackPlugin = require('html-webpack-plugin')
const CopyPlugin = require('copy-webpack-plugin')

module.exports = {
  mode: 'development',
  entry: {
    app: './app.js',
    search: './Search.js'
  },
  output: {
    filename: '[name].js?v=[contenthash]'
  },
  module: {
    rules: [
      {
        test: /\.?js$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env', '@babel/preset-react']
          }
        }
      },
      {
        test: /\.css$/i,
        use: ['style-loader', 'css-loader']
      }
    ]
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: './search.html',
      filename: 'search.html'
    }),

    new HtmlWebpackPlugin({
      template: './index.html',
      filename: 'index.html',
      excludeChunks: ['search']
    }),

    new CopyPlugin(['public'])
  ],
  devServer: {
    contentBase: path.join(__dirname, 'dist'),
    port: 3000
  }
}
