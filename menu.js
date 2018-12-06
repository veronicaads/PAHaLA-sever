const lib = require('./include.js');

function random(low, high) {
  return Math.ceil(Math.random() * (high - low) + low);
}

exports.handleGetMenu = function (req,res){
  var number = random(1,100);
  lib.curl.get("http://www.recipepuppy.com/api/", "p=" + number, function (err, response, body) {
    try {
      const result = JSON.parse(body);
      let value = lib.jsonPath.query(result,'$.results[*]');
      // console.log(value);
      res.send(value);
    } catch (err) { console.log(err); }
  });
};
