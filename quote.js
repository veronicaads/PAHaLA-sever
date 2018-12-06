const lib = require('./include.js');

exports.handleGetQuote = function(req,res) {
  lib.randomQuote().then(quote => {
    var contents = lob.jsonParser.query(quote,'$..content');
    // console.log(contents);
    var cleanText = lib.striptags(contents[0]);
    // console.log(cleanText);
    let send      = "{'quote':'"+ cleanText +"'}";
    let responses = lib.jsonFormatter.format(send);
    res.send(responses);
  }).catch(err => console.error(err));
}