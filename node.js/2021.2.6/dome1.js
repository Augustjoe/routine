// 引入mongodb
var mongoose = require('mongoose')

// 连接指定的数据库
// 指定的数据库不一定要存在，当插入第一条数据后就会自动被创建出来
mongoose.connect('mongodb://localhost/itcast')

// 设计表结构
// 字段名称就是表结构中的属性名称
// var blogSchema = new mongoose.Schema({
//     // 可规定每个数据的类型
//     title:String,
//     author:String,
//     // 也可规定数据类型为时间类型
//     comments:[{body:String,date:Date}],
//     // 也可通过defaul的方式设置默认值
//     date:{
//         type:Date,
//         default:Date.now
//     },
//     // 设置数据类型为布尔值
//     hidden:Boolean,
//     // 设置数据类型为数字类型
//     meta:{
//         favs:Number
//     }
// })

var userSchema = new mongoose.Schema({
    username: {
        type: String,
        // 设置其为必填项
        required: true,
    },
    password: {
        type: String,
        required: true,
    },
    email: String
})

// mongoose.model 方法就是用来将一个架构发布为model（数据模型）
// 第一个参数 数据库名称 mongoose会自动将数据的大写名词字符串生成小写复数的集合名称
// 第二个参数 架构Schema
// 返回：模型构造函数
var User = mongoose.model('User', userSchema)

// 新增数据
// 有个模型构造函数后，就可以新增数据
// var admin = new User({
//     username: 'zs',
//     password: '123456',
//     email: 'admin@admin.com'
// })
// admin.save(function (err, ret) {
//     if (err) {
//         console.log("保存失败")
//     } else {
//         // ret 是被保存的数据
//         console.log("保存成功", ret)
//     }
// })

// 查询数据
// 查询全部
User.find((err,ret)=>{
    if(err){
        console.log("查询失败")
    }else{
        console.log("查询成功",ret)
    }
})

// 查询单个数据
// 第一个值要输入查询条件，第二个值输入回调函数 如果查询不到返回的是null
// User.findOne({password:'123456'},(err,ret)=>{
//     if(err){
//         console.log("查询失败")
//     }else{
//         console.log("查询成功",ret)
//     }
// })

// 删除数据
// User.remove({username:'zs'},(err,ret)=>{
//     if(err){
//         console.log("删除失败")
//     }else{
//         console.log("删除成功",ret)
//     }
// })

// 更新数据
// 接受三个值，id,修改后的对象，回调函数
// User.findByIdAndUpdate('6020ff91dcb4380b5829104e',{password:'654321'},(err,ret)=>{
//         if(err){
//             console.log("更新失败")
//         }else{
//             console.log("更新成功",ret)
//         }
//     })