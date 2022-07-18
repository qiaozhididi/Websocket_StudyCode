var app = require("express")();
var server = require("http").Server(app);
var io = require("socket.io")(server);

// 启动服务器
server.listen(8080,()=>{
    console.log('服务器启动成功');
});

app.get("/", function (req, res) {
  res.sendfile(__dirname + "/index.html");
});

io.on("connection", function (socket) {
  socket.on("hehe", function (data) {
    console.log(data);
  });
});
