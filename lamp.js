const lib = require('./include.js');

exports.handleSetLampFlag = async function(req,res) {
  console.log("masuk lampu");
  if(uid = await lib.verifyToken(req,res)){
    console.log("masuk lampu verify",req.body);
    var flag = req.body.flag;
    lib.DB.none('UPDATE public.user SET lamp_stat = $1 WHERE uuid = $2',[flag,uid])
    .then(data => {
      console.log("update success");
      let value = {status_lamp : flag};
      lib.formatResponse(res, value);})
    .catch(error => {lib.formatResponse(res, {}, 400)});
  }
  else lib.formatResponse(res, {}, 401);
};

exports.handleGetLampFlag = async function(req,res) {
  if(uid = await lib.verifyToken(req,res)){
    console.log("masuk get lampu verify");
    lib.DB.one('SELECT lamp_stat FROM public.user WHERE uuid = $1',[uid])
    .then(data => {
      console.log("select success");
      let value = {status : data.lamp_stat};
      lib.formatResponse(res, value);})
    .catch(error => {lib.formatResponse(res, {}, 400)});
  }
  else lib.formatResponse(res, {}, 401);
};
