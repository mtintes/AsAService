var express = require('express');

var app = express();
var port = process.env.port;
app.get('/', function (req, res){
		res.setHeader('Access-Control-Allow-Origin', 'http://mtintes.com');
		res.json("Service is up.");
});

var server = app.listen(port, function(){

});
