const lib  = require('./include.js');
const hapi = new lib.holiday('3912e68c-3730-404c-a03f-cca3710f3d6c').v1;

var d          = new lib.xDate();
var year       = d.getFullYear();
var month      = d.getMonth();
var date       = d.getDate()+1;
var parameters = {
  country: 'ID',
  year   : year,
  month  : month,
  day    : date
};

exports.handleGetNextAlarm = async function(req,res) {
    if(uid = await lib.verifyToken(req,res)){
      console.log("masuk alarm verify",req.body);
      hapi.holidays(parameters, function (err, data) {
        lib.DB.one('SELECT schedule FROM public.user WHERE uuid = $1',[uid])
        .then(datas => {
          console.log("Database query complete");
          const value   = lib.jsonPath.query(data,'$.holiday');
          var   weekend = lib.weekend();
          var time;
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
          lib.formatResponse(res, {alarm : time[0]});
        }).catch( err => { lib.formatResponse(res, {}, 400)
          } )
      });
    } 
    else lib.formatResponse(res, {}, 401);
  };


