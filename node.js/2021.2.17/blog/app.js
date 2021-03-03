const bodyParser = require('body-parser')
var express = require('express')
var path = require('path')
var router = require('./router')
var session = require('express-session')
 
var app = express()

app.use('/public',express.static( path.join(__dirname+'/public/')))
app.use('/node_modules/',express.static(path.join(__dirname+'/node_modules/')))
// 有很多模板替换引擎 ejs jade handlebars nunjucks

app.engine('html',require('express-art-template'))

// 配置要渲染的html文件的路径
app.set('views',path.join(__dirname,'./views/'))

// 一定要在use router的前面 ，配置解析表达post请求体插件的前面
// 将json的字符串转换成对象
app.use(bodyParser.urlencoded({extended:false}))
app.use(bodyParser.json())

/*
在express 这个框架中，默认不支持session和cookie 可以用 中间件 express-session来解决

*/ 
// session 是存在内存中如果服务器重启会清空所有的session，所以要做持久化处理
app.use(session({
    //配置加密字符串，它会在原有加密的基础上加上这个字符串
    // 增加安全性防止客户端恶意伪造
    secret:'itcast', 
    resave:false,
    // 如果为true 则无论是否使用session都会存 为false则只在使用session时才会使用
    saveUninitialized:true
}))



app.use(router)

app.listen(5000,function(){
    console.log('running')
}) 