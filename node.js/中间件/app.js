var express = require('express')

var app = express()

// 中间件就是处理请求数据的函数
// exoress中，对中间健有几种分类

// 不关系请求路径和请求方法的中间件
// 不管什么方法都会进入这个中间件
/*
    req 请求对象
    res 响应对象
    next 下一个中间件 如果不调next 则会停留在当前中间件 next后的中间件也是要匹配的 不是调用紧挨着的哪一个

*/
app.use(function(req,res,next){
    console.log('1')

})

app.use(function(req,res){
    console.log('2')
})

// 以特定路径开头的中间件 路径都是以跟路径为准
app.use('/ad',function(req,res,next){

})

// app.get 和 挨批评 app。post 都有相同的参数和方法 也都可以用作中间件处理参数
app.listen(3000,function(){
    console.log('app is running')
})