var express = require('express');
var MongoClient = require('mongodb').MongoClient;
var app = express();

var bodyParser = require('body-parser')
app.use( bodyParser.json() );

var response = "";

var mongoUrl = process.env.MONGODB_URI;

app.get('/videos', function (req, res){
res.setHeader('Access-Control-Allow-Origin', 'http://mtintes.com');
	MongoClient.connect(mongoUrl, function(err, db){

		var col = db.collection('good_morning');
		var videos = [];
		col.find().toArray(
			 function(err, result){
				 for(let i = 0; i<result.length; i++){
					 videos.push(result[i].video);
				 }
				res.json(videos);
			db.close();
		});
	});
});

app.get('/', function (req, res){
res.setHeader('Access-Control-Allow-Origin', 'http://mtintes.com');
	MongoClient.connect(mongoUrl, function(err, db){

		var col = db.collection('good_morning');

		col.find().toArray(
			 function(err, result){
				res.json("https://youtube.com/watch?v="+result[0].video);
			db.close();
		});
	});

});

app.post('/add', function (req,res){
	console.log(req.body.video);

		MongoClient.connect(mongoUrl, function(err, db){
			var col = db.collection('good_morning');
		// 	for( var property in req){
		// 	console.log(property);
		// }
		col.findOne( { "video": req.body.video },function(err, result){

			console.log(result);
			if(result){
				db.close();
				res.json("video already exists");
			}else{
				col.insert(
					{video:req.body.video
						}, {w:1}, function(err, result){

				})

				db.close();

			res.json("added video");
			}


		});

	});
});


app.listen(process.env.PORT || 5000);
