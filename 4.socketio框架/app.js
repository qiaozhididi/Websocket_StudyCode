// 创建了http服务器
const http = require("http");
var fs = require("fs");
const { Socket } = require("dgram");
const app = http.createServer();

app.on("request", (req, res) => {
  fs.readFile(__dirname + "/index.html", function (err, data) {
    if (err) {
      res.writeHead(500);
      return res.end("Error loading index.html");
    }

    res.writeHead(200);
    res.end(data);
  });
});

app.listen(8888, () => {
  console.log("服务器启动成功");
});
const io = require("socket.io")(app);
// 监听用户连接事件
// Socket表示用户的连接
// socket.emit表示触发某个事件，如果需要给浏览器发送数据，需要触发浏览器注册的某个事件
// Socket.on 表示注册的某个事件，如果我需要获取浏览器数据，需要注册一个事件，等待浏览器触发
io.on("connection", (Socket) => {
  console.log("新用户连接了");
  // Socket.emit()方法表示给浏览器发送数据
  // 1.参数1：事件的名字
  Socket.on('hehe',data=>{
      console.log(data);
  })
  Socket.emit("send", data);
});
