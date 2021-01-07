// node,js中如要读取文件需要引入专用的模块
// node 代码是无法运行在浏览器中额
var fs = require('fs')

/*
    readFile 用来读取文件，接受俩个参数，
        第一个是要读取的文件路径
        第二个是一个函数
          函数接受俩个参数 error，data 成功data回显数据 失败error返回错误
*/ 
fs.readFile('./data.txt',(err,data)=>{
    console.log(err,"err");

    // <Buffer 68 65 6c 6c 6f 20 77 6f 72 6c 64>
    // 读取出来的16位的文件数据
    // console.log(data,"data")

    if(err){
        console.log('读取成功')
    }else{
        console.log('读取失败')
    }

    // 需要用toString 转换
    console.log(data.toString())


})


