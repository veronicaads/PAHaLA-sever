const lib = require('./include.js');

function random(low, high) {
  return Math.ceil(Math.random() * (high - low) + low);
}

exports.handleGetMenu = async function (req,res){
  if(uid = await lib.verifyToken(req,res)){
    console.log("masuk menu");
    var number = random(1,100);
    var opt    = {method: 'GET', url: "http://www.recipepuppy.com/api/?p=" + number, json: true};
    lib.curl.concat(opt, function (err, response, data) {
      try {
        let value = lib.jsonPath.query(data,'$.results[*]');
        lib.formatResponse(res, value);
      } catch (err) { console.error(err); lib.formatResponse(res, {}, 500); }
    });
  } else lib.formatResponse(res, {}, 401);
};
