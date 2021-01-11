// 引入http模块
var http = require('http')
// 创建node服务
var serve = http.createServer()
// 设置请求后的响应
// 可以接受俩个参数 Request Response
/*
    request 请求对象
    请求对象可以用来获取客户端的请求信息
    response 响应对象
    响应对象可以用来给客户端发送响应信息，如果不写end则不会结束响应
*/
serve.on('request', function (Request, Response) {
  console.log("请求已经收到,请求的路径是" + Request.url)

  // 也可以拿到用户的IP地址和端口号
  // ip地址用来定位计算机 端口号用来定位具体的应用程序
  // 所有需要联网通信的应用程序都会占用端口号 端口号范围为 0-65536 默认的端口号尽量不要使用 
  console.log('请求我的客户端地址是' + Request.socket.remoteAddress,Request.socket.remotePort)


  //  响应回去的数据必须是字符串或者二进制数据 可以用JSON
  Response.write(
    JSON.stringify(
      [
        {name: '张三',
        age: "18"}
      ]
    )
  )


  Response.write('hello world')
  Response.write(' my name is node.js')
  //   一定要写end 可以end的同时发送响应数据
  Response.end('end')

})
// 设置服务启动的端口号 浏览器默认的端口号为80，设置80可不输入响应号
serve.listen(3000, function () {
  console.log("服务启动，地址127.0.0.1：3000")
})


