var router = require('express').Router();
var fun = require('./findData.js')

// 读取文件
router.get('/',(req,res)=>{
    fun.find((err,data)=>{
        if(err){
            console.log(err);
        }
        res.render('index.html',data)
    })
})
// 读取文件
router.get('/form',(req,res)=>{

        res.render('form.html')
})

router.post("/addform",(req,res)=>{
    console.log(1)
    fun.save(req.body,(err)=>{
        if(err){
           res.status(500).send(err)
        }
        console.log(221)
        console.log(111)
            res.redirect('/')
    })
})

module.exports = router