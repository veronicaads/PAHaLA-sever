const lib = require('./include.js');

exports.handleGetQuote = async function(req,res) {
  if(uid = await lib.verifyToken(req,res)){
    console.log("masuk quote");
    lib.randomQuote().then(quote => {
      var contents  = lib.jsonPath.query(quote,'$..content');
      var author    = lib.jsonPath.query(quote,'$..title');
      var cleanText = lib.striptags(contents[0]);
          cleanText = cleanText.substring(0, cleanText.length - 2);
      let responses = {
        quote : cleanText,
        author: author
      };
      lib.formatResponse(res, responses);
    }).catch(err => { console.error(err); lib.formatResponse(res, {}, 500); });
  } else lib.formatResponse(res, {}, 401);
}