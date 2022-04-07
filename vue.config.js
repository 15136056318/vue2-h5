/*
 * @Description:
 * @Author: LiuYan
 * @Date: 2022-02-10 21:30:13
 * @LastEditTime: 2022-04-07 16:41:55
 * @LastEditors: LiuYan
 * @Reference:
 */
const { resolve } = require('path')
// 打包之后，看看插件文件占用
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin
const CompressionPlugin = require('compression-webpack-plugin')
const { HTTP } = require('./src/config/index')
module.exports = {
  //基本路径
  publicPath: process.env.NODE_ENV === 'production' ? './' : '/',
  //构建时的输出目录
  outputDir: 'dist',
  //放置静态资源的目录
  assetsDir: './static',
  //不生成map文件
  productionSourceMap: false,
  //关闭每次保存都进行检测
  lintOnSave: false,
  devServer: {
    host: '0.0.0.0',
    open: false,
    port: process.env.VUE_APP_PORT,
    //页面自动热重载
    hot: true,
    // host: "127.0.0.1",
    proxy: HTTP.proxy && {
      //配置多个同域名代理
      ...Object.assign(
        ...HTTP.cross_prefix.map(p => {
          let item = {
            [p]: {
              target: HTTP.cross_domain,
              changeOrigin: true,
              pathRewrite: { [`^${p}`]: p },
            },
          }
          return item
        })
      ),
    },
  },
  configureWebpack: {
    //插件
    plugins: [
      new BundleAnalyzerPlugin({
        //  可以是`server`，`static`或`disabled`。
        //  在`server`模式下，分析器将启动HTTP服务器来显示软件包报告。
        //  在“静态”模式下，会生成带有报告的单个HTML文件。
        //  在`disabled`模式下，你可以使用这个插件来将`generateStatsFile`设置为`true`来生成Webpack Stats JSON文件。
        analyzerMode: 'disabled',
        //  将在“服务器”模式下使用的主机启动HTTP服务器。
        analyzerHost: '127.0.0.1',
        //  将在“服务器”模式下使用的端口启动HTTP服务器。
        analyzerPort: 8888,
        //  路径捆绑，将在`static`模式下生成的报告文件。
        //  相对于捆绑输出目录。
        reportFilename: 'report.html',
        //  模块大小默认显示在报告中。
        //  应该是`stat`，`parsed`或者`gzip`中的一个。
        //  有关更多信息，请参见“定义”一节。
        defaultSizes: 'parsed',
        //  在默认浏览器中自动打开报告
        openAnalyzer: true,
        //  如果为true，则Webpack Stats JSON文件将在bundle输出目录中生成
        generateStatsFile: false,
        //  如果`generateStatsFile`为`true`，将会生成Webpack Stats JSON文件的名字。
        //  相对于捆绑输出目录。
        statsFilename: 'stats.json',
        //  stats.toJson（）方法的选项。
        //  例如，您可以使用`source：false`选项排除统计文件中模块的来源。
        //  在这里查看更多选项：https：  //github.com/webpack/webpack/blob/webpack-1/lib/Stats.js#L21
        statsOptions: null,
        logLevel: 'info', // 日志级别。可以是'信息'，'警告'，'错误'或'沉默'。
      }),
      new CompressionPlugin({
        algorithm: 'gzip', // 使用gzip压缩
        test: /\.js$|\.html$|\.css$/, // 匹配文件名
        filename: '[path].gz[query]', // 压缩后的文件名(保持原文件名，后缀加.gz)
        minRatio: 1, // 压缩率小于1才会压缩
        threshold: 10240, // 对超过10k的数据压缩
        deleteOriginalAssets: false, // 是否删除未压缩的源文件，谨慎设置，如果希望提供非gzip的资源，可不设置或者设置为false（比如删除打包后的gz后还可以加载到原始资源文件）
      }),
    ],
    resolve: {
      //引入模块时不带扩展
      extensions: ['.js', '.json', '.less', '.vue'],
      //指定node_modules,不需要再继续往上层寻找。
      modules: [resolve(__dirname, './node_modules')],
    },
  },
  //webpack链式操作
  chainWebpack: config => {
    config.externals({}) // 通过cdn引入
  },
}
