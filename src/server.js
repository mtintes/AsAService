var express = require('express');
var MongoClient = require('mongodb').MongoClient;
var app = express();

var bodyParser = require('body-parser')
app.use( bodyParser.json() );

var response = "";

var mongoUrl = process.env.MONGODB_URI;

var current = {date: "", video:""};

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

console.log("current date: "+current.date);

if(current.video === ""){
	MongoClient.connect(mongoUrl, function(err, db){

		var col = db.collection('good_morning');

			//look for todays video
			col.findOne({ "date": new Date().setHours(0,0,0,0)}, function(err,result){
				if(result){
					console.log(result);
					console.log(result.video);
					console.log(result._id);
					current.video = result.video;
					current.date = result.date;
				}else{
					col.find({"date":{ "$exists": false}}).toArray(
						 function(err, result){
							 var random = Math.floor(Math.random() * result.length)
							 console.log("setting video");
							 console.log(result);
							 console.log(result[random].video);
							 console.log(result[random]._id);
							current.video = result[random].video;
							current.date = new Date().setHours(0,0,0,0);
							col.update({_id:result[random]._id}, {$set: {date:current.date}});
							console.log("new date: " + current.date);
							res.json("https://youtube.com/watch?v="+current.video);
						db.close();
					});

				}


			});
		});

}else{
		console.log("video already exists");
		console.log(current.video);
		res.json("https://youtube.com/watch?v="+current.video);
}
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
