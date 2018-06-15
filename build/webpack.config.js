const path = require('path')
const webpack = require('webpack')
const HtmlWebpackPlugin = require('html-webpack-plugin')
module.exports = {
  devtool: 'eval-sourece-map',
  // 合并在一个文件里面 都执行
  // entry: ['./src/index.js', './src/index2.js'],
  // 分别打包
  entry: {
    index: './src/index.js'
  },
  output: {
    filename: '[name].js',
    path: path.resolve(__dirname, '../dist')
  },
  // 处理对应模块
  module: {
    rules: [
      {
        test: /(\.js|\.jsx)$/,
        use: {
          loader: 'babel-loader',
          // 放到外部 .babelrc
          // options: {
            // presets: [
            //   'env', 'react'
            // ]
          // }
        },
        exclude: /node_modules/
      },
      {
        test: /\.css$/,
        use: [
          {
            loader: 'style-loader'
          },
          {
            loader: 'css-loader',
            options: {
              // 类名只用于当前模块
              modules: true
            }
          },
          {
            loader: 'postcss-loader'
          }
        ]
      }
    ]
  },
  // 对应插件
  // webpack chunks 不要打错啊  会出很无语的bug的啊
  plugins: [
    new HtmlWebpackPlugin({
      template: './index.html',
      // hash: true,
      filename: 'index.html',
      chunks: ['index']
    }),
    new webpack.BannerPlugin('别抄袭'),
    // 热加载
    new webpack.HotModuleReplacementPlugin()
  ],
  // 开发服务器配置
  devServer: {
    port: 3838,
    // 更改文件自动刷新
    inline: true,
    // 所有不是.html结尾这种文件的 都指向 index.html
    historyApiFallback: true,
    hot: true
  },
  // 模式配置
  mode: 'development'
}

// object { mode?, amd?, bail?, cache?, context?, dependencies?, devServer?, devtool?, entry?, externals?, loader?, module?, name?, node?, output?, optimization?, parallelism?, performance?, plugins?, profile?, recordsInputPath?, recordsOutputPath?, recordsPath?, resolve?, resolveLoader?, stats?, target?, watch?, watchOptions? }
/**
 *  注释
 *  按 /**
 * 
 */
