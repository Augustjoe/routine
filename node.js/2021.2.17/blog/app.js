const bodyParser = require('body-parser')
var express = require('express')
var path = require('path')
var router = require('./router')

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


app.use(router)

app.listen(5000,function(){
    console.log('running')
}) 