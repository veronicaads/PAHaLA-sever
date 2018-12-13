const lib  = require('./include.js');
const wss  = new lib.webSocket.Server({port:8081});
const hapi = new lib.holiday('3912e68c-3730-404c-a03f-cca3710f3d6c').v1;

var d          = new lib.xDate();
var year       = d.getFullYear();
var month      = d.getMonth();
var date       = d.getDate();
var parameters = {
  country: 'ID',
  year   : year,
  month  : month,
  day    : date
};

function noop() {}

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
                  datax = JSON.parse(datax);
              var key   = datax['key'];
              var uuid  = datax[key];
    hapi.holidays(parameters, function (err, data) {
      lib.DB.one('SELECT schedule FROM public.user WHERE node_uid = $1',[uuid])
      .then(datas => {
        console.log("Database query complete");
        const value   = lib.jsonPath.query(data,'$.holiday');
        var   weekend = lib.weekend();
        var time;
        console.log("tes value",value,weekend);
        if   (value.length == 0 && !weekend) {
          time = lib.jsonPath.query(datas,'$..wd');
          console.log('weekday');
        }
        else if (value.length == 0 && weekend) 
        {
          time = lib.jsonPath.query(datas,'$..we');
          console.log('weekend');
        }
        else {
          time = lib.jsonPath.query(datas,'$..ph');
        }
        let send   = "{'status':'200','text': '"+ time[0]+ "'}";
        let output = lib.jsonFormatter.format(send);
        console.log(output);
        ws.send(output);
      }).catch( err => {
        let send = "{'status':'400'}";
        console.log(err);
        let response = lib.jsonFormatter.format(send);
        ws.send(response);} )
    });
  });
});

const interval = setInterval(function ping() {
  wss.clients.forEach(function each(ws) {
    if (ws.isAlive === false) return ws.terminate();
    ws.isAlive = false;
    ws.ping(noop);
  });
}, 30000);

// '3b38fe3d-77a3-4c6f-b7be-9e08829d9a7e'
