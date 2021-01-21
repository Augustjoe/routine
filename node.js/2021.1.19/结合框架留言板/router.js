// 模块功能单一，便于维护 看起来整洁方便
// 函数一等公民，便于传参和处理数据

// express 由自己的router方法来处理路由
// 第一步先引入路由
var router = require('express').Router()

var templateData = {
  msgArr: [
    {
      name: "小王", value: "入关 入关！", date: "2021.01.31"
    }
  ]
}

// 将各个接口挂载到router上
router.get('/', (req, res) => {
  res.render("index.html", templateData)
})

router.get('/post', (req, res) => {
  res.render("post.html", templateData)
})

router.post('/pinglun', (req, res) => {
  console.log(req.body)
  var msgData = req.body
  templateData.msgArr.push({
    name: msgData.name,
    value: msgData.msg,
    date: '2021.01.20'
  })
  res.redirect('/')
})



// function router(server,templateData){

//     server.get('/',(req,res)=>{
//         res.render("index.html",templateData)
//     })

//     server.get('/post',(req,res)=>{
//         res.render("post.html",templateData)
//     })

//     server.post('/pinglun',(req,res)=>{
//         console.log(req.body)
//         var msgData = req.body
//         templateData.msgArr.push({
//             name:msgData.name,
//             value:msgData.msg,
//             date:'2021.01.20'
//         })
//         res.redirect('/')
//     })

// }

// 导出router
module.exports = router