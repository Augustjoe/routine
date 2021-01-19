var express = require('express')

var app = express()

// 暴露src路径，可使用url访问src下的文件 当加上第一个参数时，请求路径必须加上第一个参数才可以访问
// app.use("/src",express.static("./src"))

// 当不写第一个参数时，访问路径也可不写。
app.use(express.static("src"))

// 当以get方法请求1时
// 创建接口 当请求路径为/ 时 返回hello express
app.get("/",(req,res)=>{
    res.send('hello express')
})

// 当以post方法请求1时
// 创建接口 当请求路径为/ 时 返回hello express
app.post("/post",(req,res)=>{
    res.send('post request')
})

// 启动服务器
app.listen(3000,()=>{
    console.log("server is running")
})

