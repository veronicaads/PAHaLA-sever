const NewsAPI = require('newsapi');
const newsapi = new NewsAPI('6e3bb3e681064618b9d1af8fc1dce1bf');

exports.handleGetNews  = function(req,res){
	newsapi.v2.topHeadlines({
		language: 'id',
		country: 'id',
	}).then(news =>{  res.send(news);}
	);
	
};
