var express = require('express');
var router = express.Router();
var bodyParser = require('body-parser');
var db = require("../models");
var request = require('request');
var parksApi = process.env.PARKS_API;
var weatherApi = process.env.WEATHER_API;

//post list of parks for each state based on search query

router.post("/", function(req,res){
	var state = req.body.state;
	var parkData = "https://developer.nps.gov/api/v1/parks?stateCode=" + state + "&api_key=" + parksApi;
	request(parkData, function(error, response, body){
		if(error){ console.log("errrrrr######or")}
		var oldPark = JSON.parse(body).data;
		var park = [];
		for(var i=0; i<oldPark.length; i++){
			if(oldPark[i].latLong !== '' && oldPark[i].description !== '' && oldPark[i].weatherInfo !== ''){
				park.push(oldPark[i]);
			}
		}
		res.render("parks/state", {park: park})
	});	
});

module.exports = router;



