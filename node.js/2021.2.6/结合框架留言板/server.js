const bodyParser = require('body-parser');
var express = require('express'); 
var router = require('./router')
var server = express()

// 设置模板引擎，当文件以art结尾时，都用模板引擎express来进行解析
// 第一个参数为要解析的文件后缀，可以自定义成各种文件
// 模板语法的使用必须要依赖express-template
//引入之后才可以使用render进行渲染
server.engine('html',require('express-art-template'));

// 如果想要修改路径，可使用如下代码
// 即可修改默认使用的路径
// server.set("view",要使用的路径)


// 当使用post时，需要引入此模块，并处理json,这些配置一定要在挂载路由之前
server.use(bodyParser.urlencoded({extended : false}));
server.use(bodyParser.json())

// 导出的函数，可直接传参
// router(server,templateData)

server.use(router);


// server.get('/pinglun',(req,res)=>{
//     console.log(req.query)
//     templateData.msgArr.push({
//         name:req.query.name,
//         value:req.query.msg,
//         date:'2021.01.20'
//     })
//     res.redirect('/')
// })

server.listen(3000,()=>{console.log('server is running')})
