var http = require('http')

var server = http.createServer()

server.on("request",function(req , res){
    // 请求头返现的状态号,和浏览器想要对其解析的方式
    // 浏览器默认解析字符串是用gkb，但服务器传输的是utf-8，故解析的为乱码
    // 如果想正确解析，需要告诉浏览器要用何种方式去解析
    if(req.url == "/text"){
        res.writeHead(200, {"Content-Type": "text/plain;charset=utf-8"})
        res.end(" hello 世界 ")
    }else if(req.url == "/html"){
        // 如果发送浏览器的是html标签则需要在text/后加上html
        res.writeHead(200, {"Content-Type": "text/html;charset=utf-8"})
        res.end("<h1>这是一个标签</h1>")
    }
})

server.listen(3000,function(){
    console.log("server is running")
})