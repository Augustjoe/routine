var http = require('http')
var fs = require("fs")
var server = http.createServer()

function start() {
  function startServer(req, res) {
    fs.readFile(`./${req.url}`, (err, data) => {
      if (err) {
        res.end("404 Not Found")
      } else {
        res.end(data)
      }
    })
  }
  server.on("request",startServer)
  server.listen("3000",()=>{console.log("服务启动")})
}
start()