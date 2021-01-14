var http = require("http")
var fs = require('fs')
// 引入url模块 对url进行处理
var URL = require('url')
var template = require("art-template")
let templateData = {
  msgArr: [
    {
      name: "李四",
      value: "今天阴天",
      date: "2021.1.13"
    },
    {
      name: "张三",
      value: "今天阴天",
      date: "2021.1.14"
    },
    {
      name: "王五",
      value: "今天阴天",
      date: "2021.1.12"
    },
  ]
}


function startServer(req, res) {
  // 输入true 模块会将url中的query解析为对象
  let url = URL.parse(req.url,true)
  let pathName = url.pathname
  if (pathName) {
    fs.readFile(`.${pathName}.html`, (err, data) => {
      if (err) {
        if (pathName.indexOf("css") !== -1) {
          fs.readFile(`.${req.url}`, (err, data) => {
            if (err) {
              console.log(req.url)
              res.end("Not Found")
            } else {
              res.end(data)
            }
          })
        }else if(pathName === "/pinglun"){
          console.log(url.query)
          // 将需要变化的数据放入数组中 再通过服务器端重定向回到首页
          templateData.msgArr.push({
            name:url.query.name,
            value:url.query.msg,
            date:"2021.1.14"
          })
          // 服务端临时重定向 重定向需要有状态码 302 
          res.statusCode = 302
          // 输入重定向的路由
          res.setHeader('Location',"/index")
          res.end()
        }
      } else {
        let html = data
        if (req.url === "/index") {
          html = template.render(data.toString(), templateData)
        }
        res.end(html)
      }
    })
    // 在这里相当于开放了css文件夹
  } else {
    res.end("404 NotFound")
  }
}

http.createServer(startServer).listen(3000, () => { console.log("running") })