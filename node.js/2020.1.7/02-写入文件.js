var fs = require('fs');

/*
    写入文件参数 
        第一个 要写入的文件路径
        第二个 需要写入的内容
        第三个 err 的回调函数 如果成功则为null
*/

fs.writeFile('./写入文件',"大哥大嫂，过年好！",(err)=>{
    console.log(err,"err")
    if(err){
        console.log('写入成功')
    }else{
        console.log('写入失败')
    }
    console.log("写入成功")
})