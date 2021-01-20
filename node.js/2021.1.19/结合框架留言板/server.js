const bodyParser = require('body-parser');
var express = require('express'); 
var server = express()

// 设置模板引擎，当文件以art结尾时，都用模板引擎express来进行解析
// 第一个参数为要解析的文件后缀，可以自定义成各种文件
// 模板语法的使用必须要依赖express-template
//引入之后才可以使用render进行渲染
server.engine('html',require('express-art-template'));

// 如果想要修改路径，可使用如下代码
// 即可修改默认使用的路径
// server.set("view",要使用的路径)


// 当使用
server.use(bodyParser.urlencoded({extended : false}));
server.use(bodyParser.json())


var templateData = {
    msgArr:[
        {
            name:"小王",value:"入关 入关！",date:"2021.01.31"
        }
    ]
}

server.get('/',(req,res)=>{
    res.render("index.html",templateData)
})

server.get('/post',(req,res)=>{
    res.render("post.html",templateData)
})

server.post('/pinglun',(req,res)=>{
    console.log(req.body)
    var msgData = req.body
    templateData.msgArr.push({
        name:msgData.name,
        value:msgData.msg,
        date:'2021.01.20'
    })
    res.redirect('/')
})
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
