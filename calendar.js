const XDate = require('xdate');

var HolidayAPI = require('node-holidayapi');
var hapi = new HolidayAPI('3912e68c-3730-404c-a03f-cca3710f3d6c').v1;
var jp = require('jsonpath');
var d = new XDate();


var year = d.getFullYear();
console.log(year);
var month = d.getMonth();
console.log(month);
var date = d.getDate();
console.log(date);
var parameters = {
    country: 'ID',
    year:    year,
    month:    month,
    day:      date
  };

hapi.holidays(parameters, function (err, data) {
    const result = data;
    const value = jp.query(result,'$.holiday');
    console.log(value.length == 0);
    var weekend = require('is-it-weekend');
    var weekend = weekend();
    if (value.length == 0 ){
        console.log ("bukan holiday");
        if (weekend === false){
            console.log ("kirim socket jam weekday");
        }
        else {
            console.log ("kirim socket jam weekend");
        }
    }
    else {
        console.log ("kirim socket jam public holiday");
    }
});




