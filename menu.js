const lib = require('./include.js');

function random(low, high) {
  return Math.ceil(Math.random() * (high - low) + low);
}

exports.handleGetMenu = async function (req,res){
  if(uid = await lib.verifyToken(req,res)){
    console.log("masuk menu");
    var number = random(1,100);
    lib.curl.get("http://www.recipepuppy.com/api/", "p=" + number, function (err, response, body) {
      try {
        let value = lib.jsonPath.query(JSON.parse(body),'$.results[*]');
        lib.formatResponse(res, value);
      } catch (err) { console.error(err); lib.formatResponse(res, {}, 500); }
    });
  } else lib.formatResponse(res, {}, 401);
};
