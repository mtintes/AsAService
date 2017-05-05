var express = require('express');

var app = express();
var port = process.env.port || 8080;

app.get('/', function (req, res){
		res.setHeader('Access-Control-Allow-Origin', 'http://mtintes.com');
		res.json("Service is up.");
});

app.listen(port, function(){

});
