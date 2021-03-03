const { json } = require('body-parser')
var express = require('express')
var User = require('./models/user')
var md5 = require('blueimp-md5')


var router = express.Router()

router.get('/', function (req, res) {
    console.log(req.session)
    res.render('index.html',{
        user:req.session.user
    })
})

router.get('/login', function (req, res) {
    res.render('login.html')
})

router.post('/login', function (req, res) {
    User.findOne({
        email:req.body.email,
        password:md5(md5(req.body.password) + 'itcats'),
    },(err,user)=>{
       if(err){
           return res.status(500).json({
               err_code:500,
               message:err.message
           })
       } 
       if(!user){
           return res.status(200).json({
               err_code:1,
               message:'邮箱或密码错误'
           })
       }
       req.session.user = user

       res.status(200).json({
           err_code:0,
           message:"success"
       })
    })
})

router.get('/register', function (req, res) {
    res.render('register.html')
})

router.post('/register', function (req, res) {
    var body = req.body
    User.findOne({
        $or: [
            {
                email: body.email
            },
            {
                nickname: body.nickname
            }
        ]
    }, function (err, data) {
        if (err) {
            // 不要去throw ，不然整个程序会崩溃退出 直接返回服务器端一个500
            return res.status(500).json({
                success: false,
                err_code: 500,
                message: '服务端错误'
            })
        }
        if (data) {
            return res.status(200).json({
                success: true,
                err_code: 1,
                message: '邮箱或密码已存在'
            })
        }
        body.password = md5(md5(body.password) + 'itcats')
        new User(body).save(function (err, user) {
            if (err) {
                return res.status(500).json({
                    success: false,
                    err_code: 500,
                    message: '服务端错误'
                })
            }

            // 注册成功后用session来存储注册后的状态
            req.session.user = user

            // Express 提供了一个方法可以将对象转换为字符串
            res.status(200).json({
                success: true,
                err_code: 0,
                message: '注册成功'
            })
        })


    }
    )
})

router.get('/logout', function (req, res) {
    // 清除登录状态
    req.session.user = null
    // 重定向到登录页
    res.redirect('/login')
})

module.exports = router