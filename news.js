const lib = require('./include.js');

exports.handleGetNews = async function(req,res) {
  if(uid = await lib.verifyToken(req,res)){
    console.log("masuk news");
    var newsapi = new lib.news('6e3bb3e681064618b9d1af8fc1dce1bf');
    newsapi.v2.topHeadlines({
      language: 'id',
      country : 'id',
    }).then(news => lib.formatResponse(res, news))
    .catch(err => { console.error(err); lib.formatResponse(res, {}, 500); });
  } else lib.formatResponse(res, {}, 401);
};
