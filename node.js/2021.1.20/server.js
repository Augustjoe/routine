var express = require('express')
var fs = require('fs')
var router = require('./router')
var bodyParser = require('body-Parser')
var app = express()

app.engine("html",require('express-art-template'))

// 当使用post时，需要引入此模块，并处理json,这些配置一定要在挂载路由之前
app.use(bodyParser.urlencoded({extended : false}));
app.use(bodyParser.json())

app.use(router)

// app.get('/',(req,res)=>{
    // fs.readFile('./data/data.json','UTF-8',(err,data)=>{
    //     if(err){
    //         return res.status(500).send(`server is err ${err}`)
    //     }
    //     console.log(JSON.parse(data))
    //     res.render('index.html',JSON.parse(data))
    // })
// })

app.listen(3000,()=>{console.log('server is running')})