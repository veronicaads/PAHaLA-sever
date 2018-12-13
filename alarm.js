const lib = require('./include.js');

exports.handleSetAlarm = async function(req, res) {
  console.log("masuk alarm");
  if(uid = await lib.verifyToken(req,res)){
    console.log("masuk alarm verify",req.body);
    var schedule = {wd: req.body.wd, we: req.body.we, ph: req.body.ph};
    var schedule_formatted = JSON.stringify(schedule);
    lib.DB.none('UPDATE public.user SET schedule = $1 WHERE uuid = $2', [schedule, uid])
    .then(() => {
      console.log("update success");
      lib.formatResponse(res, {status: 'OK'});
    }).catch(error => {lib.formatResponse(res, {}, 400)});
  } else lib.formatResponse(res, {}, 401);
};