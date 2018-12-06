const lib = require('./include.js');

exports.handleGetQuote = async function(req,res) {
  console.log("masuk quote");
  if(await lib.verifyToken(req,res)){
    console.log("masuk quote verify");
    lib.randomQuote().then(quote => {
      var contents  = lib.jsonPath.query(quote,'$..content');
      var author    = lib.jsonPath.query(quote,'$..title');
      var cleanText = lib.striptags(contents[0]);
          cleanText = cleanText.substring(0, cleanText.length - 2);
      // let send      = "{'quote':'"+ cleanText +"','author':'"+ author +"'}";
      // let responses = lib.jsonFormatter.format(send);
      // console.log(responses);
      // res.status(200).send(responses);
      let responses = {
        quote : cleanText,
        author: author
      };
      res.send(responses);
    }).catch(err => console.error(err));
  }
  else res.status(401).send();
  
}