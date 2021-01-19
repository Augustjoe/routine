var express = require('express'); 
var server = express()

// 设置模板引擎，当文件以art结尾时，都用模板引擎express来进行解析
server.engine('art',require('express-art-template'));

server.get('/',(req,res)=>{
    res.send("end")
})

server.listen(3000,()=>{console.log('server is running')})
