// 引入http模块
var http = require('http')
// 创建node服务
var serve = http.createServer()
// 设置请求后的响应
serve.on('request',function(){
   console.log("请求已经收到") 
})
// 设置服务启动的端口号
serve.listen(3000,function(){
    console.log("服务启动，地址127.0.0.1：3000")
})


