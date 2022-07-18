const ws = require("nodejs-websocket");
const PORT = 3333;
// 记录当前连接用户数量
let count = 0;
// conn每个连接到服务器的用户，都会有一个conn

const server = ws.createServer((conn) => {
  console.log("新的连接");
  count++;
  conn.userName = `用户${count}`;
  //   1.告诉所有用户，有人加入聊天室
  broadcast(`${conn.userName}进入聊天室`);
  // 接收浏览器数据
  conn.on("text", (data) => {
    // 2.收到每个用户发送消息，告诉所有用户，发送的消息内容是什么
    broadcast(data);
  }); 

  //   关闭触发
  conn.on("close", (data) => {
    console.log("关闭连接===");
    count--;
    // 3.告诉所有人，有用户离开聊天室
    broadcast(`${conn.userName}离开聊天室`);
  });
  conn.on("error", (data) => {
    console.log("发生异常===");
  });
});

// 广播，给所有用户发送消息
function broadcast(msg) {
  server.connections.forEach((item) => {
    item.send(msg);
  });
}

server.listen(PORT, () => {
  console.log("websocket服务启动成功，监听端口为===", PORT);
});
