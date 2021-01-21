var fs = require('fs')

// 查找数据
exports.find = function (callback){
    fs.readFile("./data/data.json",'utf8',(err,data)=>{
        if(err){
            callback(err)
        }else{
            callback(err,JSON.parse(data))
        }
    })
}

// 新建数据
exports.save = function (formData,callback){
    fs.readFile('./data/data.json','utf8',(err,data)=>{
        if(err){
            callback(err)
        }else{
            formData.id = new Date().getTime()
            let tableData = JSON.parse(data).tableData
            tableData.push(formData)
            fs.writeFile("./data/data.json",JSON.stringify({tableData:tableData}),(err)=>{
                if(err){
                    callback('write file is faile')
                }else{
                    callback()
                }
            }) 
        }
    })
}

// 更新数据
exports.updata = function (formData,callbask){
    fs.readFile('./data/data',(err,data)=>{
        if(err){
            callbask('not found file ')
        }else{
            let tableData = JSON.parse(data).tableData
            
        }
    })
}