var http = require('http');
var fs = require('fs')

var server = http.createServer()
function start() {
  let url = "E:/作业/web/vue 练习/text/node.js/2021.1.12/服务器动态文件目录/"
  let fileList
  fs.readdir(url, (err, data) => {
    if (err) {
      console.log(err)
      return;
    } else {
      fileList = data;
    }
  })

  function startServer(req, res) {
    let html
    let htmlStr
    fs.readFile("./table.html", (err, data) => {
      if (err) {
        res.end("404 Notfound")
      } else {

        fileList.forEach(item=>{
          htmlStr = `${htmlStr?htmlStr:""} 
          <td><a href="/${url}${item}">${item}</a></td>
          `
        })

        html = data.toString().replace("<tableList/>",htmlStr)
        console.log(html)
        res.end(html)
      }
    })
  }
  server.on('request', startServer)
  server.listen(3000, function() { console.log("running...") })
}
start()

