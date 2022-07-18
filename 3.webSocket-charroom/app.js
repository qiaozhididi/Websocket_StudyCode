const { time } = require("console");
const ws = require("nodejs-websocket");
const PORT = 3333;
const TYPE_ENTER = 0;
const TYPE_LEAVE = 1;
const TYPE_MSG = 2;

/* 
  分析：
    消息不应该是一个简单的字符串
    这个消息应该是一个对象
    type：消息的类型，0：表示进入聊天室的消息 1：用户离开聊天室的消息 2：用户发送的消息
    msg：消息的内容
    time：聊天的具体时间
*/
// 记录当前连接用户数量
let count = 0;
// conn每个连接到服务器的用户，都会有一个conn

const server = ws.createServer((conn) => {
  console.log("新的连接");
  count++;
  conn.userName = `用户${count}`;
  //   1.告诉所有用户，有人加入聊天室
  broadcast({
    type: TYPE_ENTER,
    msg: `${conn.userName}进入聊天室`,
    time: new Date().toLocaleTimeString(),
  });

  // 接收浏览器数据
  conn.on("text", (data) => {
    // 2.收到每个用户发送消息，告诉所有用户，发送的消息内容是什么
    broadcast({
      type: TYPE_MSG,
      msg: data,
      time: new Date().toLocaleTimeString(),
    });
  });

  //   关闭触发
  conn.on("close", (data) => {
    console.log("关闭连接===");
    count--;
    // 3.告诉所有人，有用户离开聊天室
    broadcast({
      type: TYPE_LEAVE,
      msg: `${conn.userName}离开聊天室`,
      time: new Date().toLocaleTimeString(),
    });
  });
  conn.on("error", (data) => {
    console.log("发生异常===");
  });
});

// 广播，给所有用户发送消息
function broadcast(msg) {
  server.connections.forEach((item) => {
    item.send(JSON.stringify(msg));
  });
}

server.listen(PORT, () => {
  console.log("websocket服务启动成功，监听端口为===", PORT);
});
