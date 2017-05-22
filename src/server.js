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

if(current.date === "" || current.date !== new Date().setHours(0,0,0,0)){
	console.log("pull new");
	MongoClient.connect(mongoUrl, function(err, db){

		var col = db.collection('good_morning');

		if(current.video){
			console.log("video is "+current.video);
			col.findOne({ "video": current.video }, function(err,result){
				console.log(result);
				console.log(result.used);
				console.log(result.video);
				console.log(result._id);

				console.log("updating yesterdays video");
				col.update({_id:result._id}, {$set: {used:true}});
			});
		}

		col.find({"used":{ "$ne": true}}).toArray(
			 function(err, result){
				 console.log("setting video");
				 console.log(result[0].video);
				 console.log(result[0]._id);
				current.video = result[0].video;
				current.date = new Date().setHours(0,0,0,0);
				console.log("new date: " + current.date);
				res.json("https://youtube.com/watch?v="+current.video);
			db.close();
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
