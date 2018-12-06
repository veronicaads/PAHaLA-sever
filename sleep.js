const lib = require('./include.js');

exports.handleSetLampSleep = async function(req,res) {
  console.log("masuk lampu");
  var sleep_time,date,month,year,date_h;
  if(await lib.verifyToken(req,res)){
    console.log("masuk lampu verify",req.body);
    var flag = req.body.flag;
    var uid  = req.body.uuid;
    lib.DB.none('UPDATE public.user SET lamp_stat = $1',flag)
    .then(data => {
      sleep_time = (new lib.xDate()).toString('yyyy-MM-dd HH:mm:ss');
      lib.DB.none('INSERT INTO statistik(uuid,sleep,date_history) VALUES $1,$2,$3',[uid,sleep_time,date_h])
      .then(data =>{
          res.status(200).send(updated);
      })
      .catch(error => {res.status(400).send();})
      console.log("update success");
      res.status(200).send(flag);})
    .catch(error => {res.status(400).send();});
  }
  // SELECT uuid, MAX(sleep) FROM public.statistik WHERE uuid = $1 GROUP BY uuid;
  else res.status(401).send();
};
