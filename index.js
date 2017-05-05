var express = require('express');

var app = express();

app.get('/', function (req, res){
		res.setHeader('Access-Control-Allow-Origin', 'http://mtintes.com');
		res.json("Service is up.");
});

app.listen(process.env.PORT || 5000);
