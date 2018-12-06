const lib = require('./include.js');

exports.handleGetNews = async function(req,res) {
  if(await lib.verifyToken(req,res)){
    console.log("masuk news");
    var newsapi = new lib.news('6e3bb3e681064618b9d1af8fc1dce1bf');
    newsapi.v2.topHeadlines({
      language: 'id',
      country : 'id',
    }).then(news =>{ res.send(news); })
    .catch(err => console.error(err));
  } else res.status(401);
};
