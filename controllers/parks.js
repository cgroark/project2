var express = require('express');
var router = express.Router();
var bodyParser = require('body-parser');
var db = require("../models");
var request = require('request');
var parksApi = process.env.PARKS_API;
var weatherApi = process.env.WEATHER_API;

// router.get("/state", function(req, res){
// 	res.render("parks/state");
// });

router.post("/", function(req,res){
	var parkData = "https://developer.nps.gov/api/v1/parks?stateCode=" + req.body.state + "&api_key=" + parksApi;
	request(parkData, function(error, response, body){
		var oldPark = JSON.parse(body).data;
		var park = [];
		for(var i=0; i<oldPark.length; i++){
			if(oldPark[i].latLong !== ''){
				park.push(oldPark[i]);
			}
		}
		console.log(park[0]);
		res.render("parks/state", {park: park})
	});	
});



module.exports = router;



