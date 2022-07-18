// 1.导入nodejs-websocket包
const ws = require("nodejs-websocket");
const PORT = 3000;
// 2.创建一个server
// 2.1 处理用户发送的请求

// 每次只要有用户连接，函数就会被执行，会给当前连接的用户创建一个conn对象

const server = ws.createServer((connect) => {
  console.log("有新的用户连接");
  //   每当结构到用户传递过来的数据，这个text事件就会被触发
  connect.on("text", (data) => {
    console.log("接收到用户的数据===", data);
    //   给用户一个响应的数据
    // 对用户发送的数据做处理，例：把小写转换成大写，并拼接一点内容
    connect.send(data.toUpperCase() + "!!!");
  });

  //   只要webSocket服务断开，close事件就会触发
  connect.on("close", () => {
    console.log("连接断开");
  });

  //   注册error，处理用户错误信息
  connect.on("error", () => {
    console.log("用户连接异常");
  });
});

server.listen(PORT, () => {
  console.log("websocket服务启动成功，监听端口为===", PORT);
});
