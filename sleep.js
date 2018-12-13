const lib = require('./include.js');

exports.handleSetLampSleep = async function(req,res) {
  console.log("masuk lampu");
  var sleep_time,date,month,year,date_h;
  if(uid = await lib.verifyToken(req,res)){
    console.log("masuk lampu verify",req.body);
    var flag   = req.body.flag;
    var date_h = new lib.xDate().toString('yyyy-MM-dd');
    lib.DB.none('UPDATE public.user SET lamp_stat = $1 WHERE uuid = $2',[flag,uid])
    .then(data => {
      sleep_time = (new lib.xDate()).toString('yyyy-MM-dd HH:mm:ss');
      lib.DB.one('SELECT height,node_uid FROM public.user WHERE uuid = $1',[uid])
      .then(data => {
        var height   = data.height;
        var node_uid = data.node_uid;
          lib.DB.none('INSERT INTO statistik(uuid,sleep,date_history,height,node_uuid) VALUES ($1,$2,$3,$4,$5)',[uid,sleep_time,date_h,height,node_uid])
        .then(data =>{
          lib.formatResponse(res, {status : 'OK'});
        })
        .catch(error => {lib.formatResponse(res, {}, 400)});
      })
      .catch(error => {lib.formatResponse(res, {}, 400)});
      console.log("update success");
      lib.formatResponse(res, {status : 'OK'});})
    .catch(error => {lib.formatResponse(res, {}, 400)});
  } 
  // SELECT uuid, MAX(sleep) FROM public.statistik WHERE uuid = $1 GROUP BY uuid;
  else res.status(401).send();
};
