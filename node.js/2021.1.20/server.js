var express = require('express')
var fs = require('fs')

var app = express()

app.engine("html",require('express-art-template'))

app.get('/',(req,res)=>{
    fs.readFile('./data/data.json','UTF-8',(err,data)=>{
        if(err){
            return res.status(500).send(`server is err ${err}`)
        }
        console.log(JSON.parse(data))
        res.render('index.html',JSON.parse(data))
    })
})
app.listen(3000,()=>{console.log('server is running')})