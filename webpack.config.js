const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const CopyWebpackPlugin = require('copy-webpack-plugin')


module.exports = (env, argv) => {
  const isProd = argv.mode === 'production'
  const isDev = !isProd

  console.log('isProd', isProd)
  console.log('isDev', isDev)

  const filename = (ext) =>
    isProd ? `[name].[contenthash].bundle.${ext}` : `[name].bundle.${ext}`

  return {
    target: 'web',
    context: path.resolve(__dirname, 'src'),
    entry: {
      main: [
        'core-js/stable',
        'regenerator-runtime/runtime',
        './app.js'
      ],
    },
    output: {
      path: path.resolve(__dirname, 'dist'),
      filename: filename('js'),
      clean: true
    },
    resolve: {
      extensions: ['.js'],
      alias: {
        '@': path.resolve(__dirname, 'src')
      }
    },
    devServer: {
      port: '3000',
      open: true,
      hot: true,
      watchContentBase: true,
      // contentBase: path.resolve(__dirname, 'src'),
      contentBase: path.resolve(__dirname, 'public'),
    },
    devtool: isDev ? 'source-map' : false,
    plugins: [
      new HtmlWebpackPlugin({
        template: './index.html'
      }),
      new MiniCssExtractPlugin({
        filename: filename('css')
      }),
      new CopyWebpackPlugin({
        patterns: [
          {
            from: path.resolve(__dirname, 'public'),
            to: path.resolve(__dirname, 'dist'),
          }
        ]
      }),
    ],
    module: {
      rules: [
        {
          test: /\.css$/i,
          use: [MiniCssExtractPlugin.loader, "css-loader"],
        },
        {
          test: /\.m?js$/,
          exclude: /node_modules/,
          use: {
            loader: "babel-loader",
            options: {
              presets: ['@babel/preset-env']
            }
          }
        }
      ],
    }
  }
}
