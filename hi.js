const WebSocket = require('ws');
const wss = new WebSocket.Server({ port: 8080 });
const ws = new WebSocket('ws://pahala.xyz/hi');
 
ws.on('open', function open() {
  ws.send('something');
});
 
ws.on('message', function incoming(data) {
  console.log(data);
});

wss.on('connection', function connection(ws) {
  ws.on('message', function incoming(message) {
    console.log('received: %s', message);
  });
 
  ws.send('something');
});
