// 启动聊天服务端的程序

var app = require('express')();
var server = require('http').Server(app);
var io = require('socket.io')(server);

server.listen(80,()=>{
    console.log('服务端启动成功');
});

app.get('/', function (req, res) {
  res.sendfile(__dirname + '/index.html');
});

io.on('connection', function (socket) {
  socket.emit('news', { hello: 'world' });
  socket.on('my other event', function (data) {
    console.log(data);
  });
});