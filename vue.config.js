const path = require('path')
module.exports = {
  pluginOptions: {
    'style-resources-loader': {
      preProcessor: 'less',
      patterns: [
        path.join(__dirname, './src/styles/variables.less')
      ]
    }
  },
  chainWebpack: config => {
    config.devServer.disableHostCheck(true)
  },
  configureWebpack: {
    externals: {
      // 用来去除打包时候的常用不变模块
      qc: 'QC'
    }
  }
}
