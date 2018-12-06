const WebSocket = require('ws');
const XDate = require('xdate');
const jf = require('json-string-formatter');
const HolidayAPI = require('node-holidayapi');
const Weekend = require('is-it-weekend');
const jp = require('jsonpath');
const pgp = require("pg-promise")();

const DB = pgp({
  host: 'localhost',
  port: 5432,
  database: 'pahaladb',
  user: 'postgres',
  password: ''
});

var d = new XDate();
var year = d.getFullYear();
var month = d.getMonth();
var date = d.getDate();
var parameters = {
  country: 'ID',
  year   : year,
  month  : month,
  day    : date
};

const wss = new WebSocket.Server({port:8080});
const hapi = new HolidayAPI('3912e68c-3730-404c-a03f-cca3710f3d6c').v1;

function heartbeat() {
  this.isAlive = true;
}

wss.on('connection', function connection (ws,req){
  console.log("wss connection complete");
  ws.isAlive = true;
  ws.on('pong', heartbeat);
  ws.on('open', function open(){
    console.log('wss open complete');
    ws.send('Date.now(): ' + Date.now());
  });
  ws.on('message', function incoming(datax){
    console.log("wss message received: " + datax);
    var key = jp.query(datax,'$.key[0]');
    if (key === 'uuid') var uuid = jp.query(datax,'$.uuid[0]');
    hapi.holidays(parameters, function (err, data) {
      console.log("Holiday complete");
      db.one('SELECT schedule FROM public.user WHERE node_uid = $1',uuid)
      .then(datas => {
        console.log("Database query complete");
        const value = jp.query(data,'$.holiday');
        var weekend = Weekend();
        // console.log(datas);
        var time;
        if (value.length == 0 && !weekend) time = jp.query(datas,'$..wd');
        else if (value.length == 0 && weekend) time = jp.query(datas,'$..we');
        else time = jp.query(datas,'$..ph');
        let send = "{'status':'200','text': '"+ time[0]+ "'}";
        let output = jf.format(send);
        console.log(output);
        ws.send(output);
      }).catch( err => {
        let send = "{'status':'400'}";
        let response = jf.format(send);
        ws.send(response);} )
    });
  });
});

const interval = setInterval(function ping() {
  wss.clients.forEach(function each(ws) {
    if (ws.isAlive === false) return ws.terminate();
    ws.isAlive = false;
    ws.ping(() {});
  });
}, 30000);
