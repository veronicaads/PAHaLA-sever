const lib = require('./include.js');
const wss = new lib.webSocket.Server({port:8080});

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
                    datax = JSON.parse(datax);
                var key   = datax['key'];
                var uuid  = datax[key];
    console.log(datax, key, uuid);
    lib.DB.one('SELECT lamp_stat FROM public.user WHERE node_uid = $1',[uuid]).then(datas => {
      console.log(datas);
      let send   = `{"status": "200", "flag": "${ datas.lamp_stat ? "true" : "false" }"}`;
      let output = lib.jsonFormatter.format(send);
      console.log(output);
      ws.send(output);
    }).catch( err => {
      let send     = '{"status": "400"}';
      let response = lib.jsonFormatter.format(send);
      //ws.send(response);
    })    
  });
});

const interval = setInterval(function ping() {
  wss.clients.forEach(function each(ws) {
    if (ws.isAlive === false) return ws.terminate();
    ws.isAlive = false;
    ws.ping(noop);
  });
}, 30000);
