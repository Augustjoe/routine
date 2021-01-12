var http = require("http");
var file = require("fs");

var server = http.createServer();

function start() {
  function toStart(req, res) {
    if (req.url === "/index") {
      file.readFile("./index.html", (err, data) => {
        if (err) {
          res.writeHead(200, {"Content-Type": "text/plain;charset=utf-8"})
          res.end("文件未找到")
        } else {
          console.log(data.toString())
          res.writeHead(200, {"Content-Type": "text/html;"})
          res.end(data)
        }
      })
    }
  }
  server.on("request",toStart)
  server.listen(3000,function(){
    console.log("启动成功")
  })
}
start()

