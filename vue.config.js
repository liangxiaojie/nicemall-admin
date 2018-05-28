const path = require('path');

module.exports = {
  lintOnSave: false,
  chainWebpack: (config) => {
    config.module
      .rule('svg')
      .test(/\.(svg)(\?.*)?$/)
      .include.add(path.join(__dirname, 'src/icons')).end()
      .use('svg-sprite-loader')
      .loader('svg-sprite-loader')
      .options({
        symbolId: 'icon-[name]',
      });
  },
};
