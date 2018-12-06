const lib = require('./include.js');

lib.openWeather.setLang('id');
lib.openWeather.setUnits('metric');
lib.openWeather.setAPPID('a2f827bac4d8efec98b9fabda2632246');

exports.handleGetWeather = function(req,res) {
  let lon = req.body.lon, lat = req.body.lat;
  lib.openWeather.setCoordinate(lat,lon);
  lib.openWeather.getAllWeather(function(err, JSONObj) { 
    // console.log(JSONObj);
    res.send(JSONObj);
  });
};
