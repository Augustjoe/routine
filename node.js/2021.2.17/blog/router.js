const { json } = require('body-parser')
var express = require('express')
var User = require('./models/user')
var md5 = require('blueimp-md5')


var router = express.Router()

router.get('/', function (req, res) {
    res.render('index.html')
})

router.get('/login', function (req, res) {
    res.render('login.html')
})

router.post('/login', function (req, res) {

})

router.get('/register', function (req, res) {
    res.render('register.html')
})

router.post('/register', function (req, res) {
    var body = req.body
    User.findOne({
        $or:[
            {
                email:body.email
            },
            {
                nickname:body.nickname
            }
        ]
    },function(err,data){
        if(err){
            // 不要去throw ，不然整个程序会崩溃退出 直接返回服务器端一个500
            return res.status(500).json({
                success:false,
                err_code:500,
                message:'服务端错误'
            })
        }
        if(data){
            return res.status(200).json({
                success:true,
                err_code:1,
                message:'邮箱或密码已存在'
            })
        }
        body.password = md5(md5(body.password))
        new User(body).save(function(err,user){
            if(err){
                return res.status(500).json({
                    success:false,
                    err_code:500,
                    message:'服务端错误'
                })
            }

        })

        // Express 提供了一个方法可以将对象转换为字符串
        res.status(200).json({
            success:true,
            err_code:0,
            message:'注册成功'
        })
    }
    )
})

module.exports = router