const lib = require('./include.js');

exports.handleSetAlarm = async function(req,res) {
  console.log("masuk alarm");
  if(await lib.verifyToken(req,res)){
    console.log("masuk alarm verify",req.body);
    var wd       = req.body.wd;
    var we       = req.body.we;
    var ph       = req.body.ph;
    var uuid     = req.body.uuid;
    var schedule = {
        wd: wd,
        we: we,
        ph: ph
    };
    console.log(uuid);
    var schedule_formatted = JSON.stringify(schedule);
    console.log(schedule_formatted, schedule);
    lib.DB.none('UPDATE public.user SET schedule = $1 WHERE uuid = $2',[schedule,uuid])
    .then(data => {
      console.log("update success");
      console.log(data);
      res.status(200).send(ok);})
    .catch(error => {res.status(400).send();});
  }
  else res.status(401).send();
};