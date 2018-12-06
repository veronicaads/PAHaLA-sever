const WebSocket = require('ws');
const wss = new WebSocket.Server({port:8080});
var Promise = require('promise');
let ips='';
let ipv='';

function tes(){
wss.on('connection', async function connection (ws,req){
    const ip = req.connection.remoteAddress;
    ips = ip.split(':');
    ipv = ips[ips.length-1];
    console.log(ips[ips.length-1]);
    console.log(ipv);
    console.log(ipv.length);
    return ipv.length;
});
}

async function connect(){
    console.log ("masuk fungsi");
    var ipv_wait = await tes();
    console.log(ipv_wait);
    if(ipv_wait.length > 0){
        console.log("asd");
        const ws = new WebSocket('ws://'+ipv);
        console.log(ws);
        ws.on('open', function open(){
            console.log('connected');
            ws.send('something');
            ws.send(Date.now());
        });
        
        ws.on('message', function incoming(data){
            console.log(data);
        });
        
        ws.on('connection', function connection(ws){
            ws.on('message', function incoming(message){
                console.log('received: %s', message);
            });
            ws.send('something');
        });
    }
}

connect();
