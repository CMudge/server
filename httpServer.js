// Load the libraries
var express = require('express');
var path = require("path");
var fs = require("fs");
var url = require("url");
var app = express();

var bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({
  extended: true
}));
app.use(bodyParser.json());   

// adding functionality to allow cross-domain queries when PhoneGap is running a server
// this prevents cross-domain errors
app.use(function(req, res, next) {
	res.setHeader("Access-Control-Allow-Origin", "*");
	res.setHeader("Access-Control-Allow-Headers", "X-Requested-With");
	res.setHeader('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
	next();
});
	
// add an http server to serve files to the Edge browser 
// due to certificate issues it rejects the https files if they are not
// directly called in a typed URL
var http = require('http');
var httpServer = http.createServer(app); 
httpServer.listen(4480);


app.get('/closestQuestion', function (req,res) {
pool.connect(function(err,client,done) {	
	if(err){
		console.log("not able to get connection "+ err);
		res.status(400).send(err);
	}
	// Code to parse "GET" arguments taken from:
	// https://stackoverflow.com/questions/6912584/how-to-get-get-query-string-variables-in-express-js-on-node-js
	var parts = url.parse(req.url, true);
    var args = parts.query;
	var lat = args.lat;
	var lng = args.lng;
	var query = "SELECT 'FeatureCollection' as type,"+
"        array_to_json(array_agg(f)) as features "+
"	FROM ("+
"	SELECT 'Feature' As type,"+
"	ST_AsGeoJSON(lg.geom)::json As geometry,"+
"	row_to_json((SELECT l FROM (SELECT question,answer1,answer2,answer3,answer4,correctanswer) as l)) as properties "+
"FROM (SELECT *, ST_Distance(questions.geom, ST_GeomFromText('POINT("+lng+" "+lat+")', 4326)) as distance "+
"FROM questions ORDER BY distance LIMIT 1) lg"+
") As f;";
	console.log(query);
	client.query(query, function(err, result) {
		done();
		if(err){
			console.log(err);
			res.status(400).send(err);
		}
		res.status(200).send(result.rows);
		});
	});
});
	
app.post('/createQuestion',function(req,res){
       // note that we are using POST here as we are uploading data
       // so the parameters form part of the BODY of the request rather than the RESTful API
       console.dir(req.body);
       pool.connect(function(err,client,done) {
             if(err){
             console.log("not able to get connection "+ err);
             res.status(400).send(err);
             }
			 
			 // pull the geometry component together
			var geometrystring = "st_geomfromtext('POINT(" + req.body.longitude + " " + req.body.latitude + ")', 4326";
			 
             var querystring = "INSERT into questions (question, answer1, answer2, answer3, answer4, correctAnswer, geom) values ('" + req.body.question + "','" + req.body.answer1 + "','" + req.body.answer2 +"','" + req.body.answer3 + "','" + req.body.answer4 + "','" + req.body.correctAnswer + "'," + geometrystring + "));";
			 
             console.log(querystring);
             client.query(querystring, function(err,result) {
				done();
				if(err){
					console.log(err);
					res.status(400).send(err);
				}
				
          res.status(200).send("row inserted");
       });
	}); 
});
	

// read in the file and force it to be a string by adding "" at the beginning
var configtext = ""+fs.readFileSync("/home/studentuser/certs/postGISConnection.js");

// now convert the configruation file into the correct format -i.e. a name/value pair array
var configarray = configtext.split(",");
var config = {};
for (var i = 0; i < configarray.length; i++) {
	var split = configarray[i].split(':');
	config[split[0].trim()] = split[1].trim();
}

var pg = require('pg');
var pool = new pg.Pool(config);