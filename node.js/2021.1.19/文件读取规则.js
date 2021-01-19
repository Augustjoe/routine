var fs = require('fs');

// 读取的是相对路径下的src ./可以不加
fs.readFile("./src/hello",(err,data)=>{
    console.log(data)
})

// 同样读取的是相对路径下的src
fs.readFile("src/hello",(err,data)=>{
    console.log(data)
})

// 读取的是所在磁盘的src
fs.readFile("/src/hello",(err,data)=>{
    console.log(data)
})

// 相对路径的src
require("./src/hell")
// 所在磁盘根目录下的src
require("/src/hell")
// 没有这种写法会报错
require("src/hell")


