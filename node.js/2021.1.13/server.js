var http = require("http");
var fs = require("fs")
var template = require("art-template")
var server = http.createServer()

let templateData = {
    name:"Lilei",
    age:18,
    province:"石家庄",
    like:[
        "代码","游戏","美少女"
    ]
}

function start(req,res){
    console.log(req.url)
    fs.readFile("./模板语法.html",function(err,data){
        if(err){
            res.end("404 NotFound")
        }else{
            let html = data.toString();
            console.log(html)
            let page = template.render(html,templateData)
            console.log(page)
            res.end(page)
        }
    })
    
}

server.on("request",start)
server.listen(3000,()=>{console.log("running 1.13")})