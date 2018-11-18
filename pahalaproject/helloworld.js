const express = require('express')
const app = express() 
const port = 8200 
var bodyParser = require('body-parser');
                                                                                                             
app.use(bodyParser.json()); //support json encoded bodies
app.use(bodyParser.urlencoded(
{extended: true})); //support encoded bodies

//app.configure(function(){
//	app.use(express.bodyParser());
//	app.user(app.router);
//});
                                                                                                             
app.get('/hello',function(req,res){
        var name = req.param('nama');
        res.send('Hello' + name + '!');
});
                                                                                                             
app.post('/hello',function(req,res){
        var name = req.body.names;
        res.send('Hallo ' + name + '! Semoga Harimu menyenangkan!');
});
                                                                                                             
app.listen(port, () => console.log(`Example app listening on port ${port}!`))
