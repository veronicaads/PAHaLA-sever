const WebSocket = require('ws');
const wss = new WebSocket.Server({port:8080});

function noop() {}
 
function heartbeat() {
  this.isAlive = true;
}

wss.on('connection', function connection (ws,req){
    console.log("masuk wss");
    ws.isAlive = true;
    ws.on('pong', heartbeat);
    ws.on('open', function open(){
        console.log('connected');
        ws.send('something');
        ws.send(Date.now());
    });
    
    ws.on('message', function incoming(datax){
      console.log("INCOMING" + datax);
      var key = jp.query(datax,'$.key[0]');
      if (key === 'uuid'){
          var uuid = jp.query(datax,'$.uuid[0]');
      }
      db.one('SELECT schedule FROM public.user WHERE node_uid = $1',uuid)
                    .then(datas => {
                        let send = "{'status':'200','flag': on'}";
                        let output = jsonFormatter.format(send);
                        console.log(output);
                        ws.send(output);
                    }).catch( err => {
                        let send = "{'status':'400'}";
                        let response = jsonFormatter.format(send);
                        ws.send(response);} )    
    });
});

const interval = setInterval(function ping() {
    wss.clients.forEach(function each(ws) {
      if (ws.isAlive === false) return ws.terminate();
      ws.isAlive = false;
      ws.ping(noop);
    });
  }, 30000);

