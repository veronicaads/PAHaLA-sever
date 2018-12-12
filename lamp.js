const lib = require('./include.js');

exports.handleSetLampFlag = async function(req,res) {
  console.log("masuk lampu");
  if(await lib.verifyToken(req,res)){
    console.log("masuk lampu verify",req.body);
    var flag = req.body.flag;
    var uuid = req.body.uuid;
    lib.DB.none('UPDATE public.user SET lamp_stat = $1 WHERE uuid = $2',[flag,uuid])
    .then(data => {
      console.log("update success");
      res.status(200).send(flag);})
    .catch(error => {res.status(400).send();});
  }
  else res.status(401).send();
};
