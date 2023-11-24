module.exports = {
  pages: {
    index: {
      // page 的入口
      entry: 'src/main.js'
    }
  },
  lintOnSave: false,//关闭语法检查
  // 开启代理服务器（方式一）
  // devServer: {
  //   // 需要联系的服务器地址（只能配置一个）
  //   proxy: 'http://localhost:5000'
  // }

  // 开去代理服务器（方式二）
  devServer: {
    proxy: {
      // 配置请求前缀/ Ken后，代理服务器会在端口号后面地址的前缀配上/ken （如：http://localhost:8080/ken/students）
      '/ken': {
        // 需要联系的服务器地址
        target: 'http://localhost:5000',
        pathRewrite: { '^/ken': '' },//在代理服务器向5050服务器发送请求时,去掉地址前缀的/ken
        // ws: true,//用于支持websocket(默认true)
        // changeOrigin: true//用于控制请求头的host值  true:localhost值为5050 false:localhost值为8080(默认true)
      },
      '/demo': {
        target: 'http://localhost:5001',
        pathRewrite: { '^/demo': '' },
        // ws: true,
        // changeOrigin: true
      },
    }
  }
}