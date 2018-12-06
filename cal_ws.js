const XDate = require('xdate');

var HolidayAPI = require('node-holidayapi');
var hapi = new HolidayAPI('3912e68c-3730-404c-a03f-cca3710f3d6c').v1;
var jp = require('jsonpath');
var d = new XDate();


var year = d.getFullYear();
console.log(year);
var month = d.getMonth();
console.log(month);
var date = d.getDate();
console.log(date);
var parameters = {
    country: 'ID',
    year:    year,
    month:    month,
    day:      date
  };
  const WebSocket = require('ws');
  const wss = new WebSocket.Server({port:8080});
  const pgp = require("pg-promise")();
  const cn = {
      host: 'localhost',
          port: 5432,
          database: 'pahaladb',
          user: 'postgres',
          password: ''
  };
  const db = pgp(cn);

function handleDay(){
    hapi.holidays(parameters, function (err, data) {
        const result = data;
        const value = jp.query(result,'$.holiday');
        console.log(value.length == 0);
        var weekend = require('is-it-weekend');
        var weekend = weekend();
        if (value.length == 0){
            if (weekend === false){
                return 'wd';
            }
            else {
                return 'we';
            }
        }
        else {
           return 'ph';
        }
    });
}
    
async function handleConnectionDay() {
    wss.on('connection',async function connection (ws,req){
        console.log("masuk wss");
        ws.on('open', function open(){
            console.log('connected');
            ws.send('something');
            ws.send(Date.now());
        });
        
        ws.on('message',async  function incoming(data){
          console.log("INCOMING" + data);
          var day = await handleDay();
          console.log(day);
          ws.send(day);
        });
    });
}

handleDay();




