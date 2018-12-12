const lib = require('./include.js');

exports.handleSetScale = async function(req,res) {
  console.log("masuk scale");
    var weight = req.body.weight;
    var uuid   = req.body.uuid;
    console.log(weight,uuid);
    console.log(req.body);
    var date_h      = new lib.xDate().toString('yyyy-MM-dd');
    var wakeup_time = (new lib.xDate()).toString('yyyy-MM-dd HH:mm:ss');
    lib.DB.none('UPDATE public.statistik SET weight = $1, wakeup = $4 WHERE sleep = (SELECT MAX(sleep) FROM public.statistik GROUP BY node_uuid HAVING node_uuid = $2) AND node_uuid = $3;',[weight,uuid,uuid,wakeup_time])
    .then(data => {
        lib.DB.none('DELETE FROM public.statistik WHERE wakeup = NULL')
          .then(data =>{
            res.status(200).send('updated');
            console.log("update success");
          })
          .catch(error => { res.status(402).send();} )
        })
    .catch(error => {res.status(400).send();});
};