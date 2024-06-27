// var FStream = require('fs');
// const CompressionPlugin = require('compression-webpack-plugin');
// const WebPack = require('webpack');

module.exports = {
  pages: {
    index: {
      entry: 'src/main.js',
      title: 'Admin Portal',
    },
  },
  // `` transpileDependencies ``: By default, babel-loader ignore files in node_modules
  transpileDependencies: ['vuetify'],

  // configureWebpack: config => {
  //   if (
  //     process.env.NODE_ENV === 'production' ||
  //     process.env.NODE_ENV === 'sit' ||
  //     process.env.NODE_ENV === 'test' ||
  //     process.env.NODE_ENV === 'sit_green'
  //   ) {
  //     config.plugins[1].definitions['process.env'].VUE_APP_VERSION = new Date().getTime();
  //     FStream.writeFile('public/version.js', config.plugins[1].definitions['process.env'].VUE_APP_VERSION.toString(), function(
  //       err
  //     ) {
  //       if (err) throw err;
  //       console.log('版本信息写入成功!');
  //     });
  //     // 对大的文件进行gzip压缩
  //     let compress = new CompressionPlugin({
  //       test: /\.js$|\.html$|\.css/,
  //       threshold: 10240, // 对超过10kb的数据进行压缩
  //       deleteOriginalAssets: false, // 不删除源文件
  //     });
  //     config.plugins.push(compress);
  //   }
  // },
  // chainWebpack: config => {
  //   // vue-tel-input import awesome-phonenumber, but duplicate between splitted chunks
  //   // chunks: 'all' means, that particular chunk can be used between async / non-async chunks
  //   // config.optimization.splitChunks({
  //   //   cacheGroups: {
  //   //     phone: {
  //   //       test: /[\\/]node_modules[\\/](awesome-phonenumber)[\\/]/,
  //   //       name: 'awesome-phonenumber',
  //   //       chunks: 'all',
  //   //     },
  //   //   },
  //   // });

  //   // reduce MomentJS bundle size by removing unnecessary locale file
  //   config.plugin('ignore').use(new WebPack.ContextReplacementPlugin(/moment[/\\]locale$/, /zh-cn|zh-tw|en-gb/));
  //   return config;
  // },
};

// module.exports = {
//   devServer: {
//     disableHostCheck: true,
//   },

//   transpileDependencies: ['vuetify'],
// }
