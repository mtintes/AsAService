var express = require('express');
var MongoClient = require('mongodb').MongoClient;
var app = express();

var response = "";

var mongoUrl = process.env.MONGODB_URI;

app.get('/load', function (req, res){
res.setHeader('Access-Control-Allow-Origin', 'http://mtintes.com');
	MongoClient.connect(mongoUrl, function(err, db){

		var col = db.collection('good_morning');
		
		col.insert(
			{
				videos:["1TffpkE2GU4",
			"59Q_lhgGANc",
			"KDXOzr0GoA4",
			"uq-gYOrU8bA",
			"XfR9iY5y94s",
			"eFTLKWw542g",
			"qYkbTyHXwbs",
			"hCuMWrfXG4E",
			"ltrMfT4Qz5Y",
			"K1b8AhIsSYQ",
			"Iwuy4hHO3YQ",
			"La4Dcd1aUcE",
			"eu0KsZ_MVBc",
			"HKtsdZs9LJo",
			"YgSPaXgAdzE",
			"kemivUKb4f4",
			"eBG7P-K-r1Y",
			"jwv-iRvyDZg",
			"cDIzMGh94vo",
			"A7lxd7RL1To",
"Q4-XIKt-ADs",
"1iAYhQsQhSY",
"e4Ao-iNPPUc",
"IvUU8joBb1Q",
"eS_korRhTDk",
"jyqWjl7GkCE",
"Qi7KDOAj4Xo",
"CTAud5O7Qqk",
"v1c2OfAzDTI",
"Kk8eJh4i8Lo",
"iWOyfLBYtuU",
"WbN0nX61rIs",
"pmGNo8RL5kM",
"oIIxlgcuQRU",
	"Lt6r-k9Bk6o",
	"Rk_sAHh9s08",
	"2eBZqmL8ehg",
	"JgffRW1fKDk",
	"GpBFOJ3R0M4",
	"raRGnueg8Lo",
	"5NZsCYOM4j0",
	"E2Oe5YKhzCE",
	"T8Xb_7YDroQ",
	"TDkhl-CgETg",
	"MW6E_TNgCsY",
	"EkwD5rQ-_d4",
	"sc5iTNVEOAg",
	"wYsMjEeEg4g",
	"NIGMUAMevH0",
	"Z1gxJ7mj2uY",
	"D675mAfdNeU",
	"9xeLSp7t6d0",
	"Z49XQUJx9iA",
	"3sOXiL05VSY",
	"-53w2mv_upw",
	"nOjFVuiUJPY",
	"o0Pt7M0weUI",
	"-2hxU4UG3dA",
	"1gX1EP6mG-E",
	"Ln6WQqRDrCo",
	"wsdy_rct6uo",
	"ah5gAkna3jI",
	"XAbY2cmEsS0",
	"ii6kJaGiRaI",
	"_XC2mqcMMGQ",
	"dTAAsCNK7RA",
	"qybUFnY7Y8w",
	"LWGJA9i18Co",
	"cDIzMGh94vo"
]}, {w:1}, function(err, result){
			db.close();
		})
	});
		res.json(response);

});

app.get('/videos', function (req, res){
res.setHeader('Access-Control-Allow-Origin', 'http://mtintes.com');
	MongoClient.connect(mongoUrl, function(err, db){

		var col = db.collection('good_morning');

		col.find().toArray(
			 function(err, result){
				res.json(result[0].videos);
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
				res.json("https://youtube.com/watch?v="+result[0].videos[0]);
			db.close();
		});
	});



});



app.listen(process.env.PORT || 5000);
