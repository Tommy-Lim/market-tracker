var express = require('express');
var router = express.Router();
var models = require('../models/schemas');
var mongoose = require('mongoose');
var request = require('request');
// mongoose.connect('mongodb://localhost/markettracker');


// Routes....

router.route('/')
.get(function(req, res){
  return res.send({msg: "stocks / get route hit"});
})

router.route('/:query')
.get(function(req, res) {
  console.log(req.params.query);
  var url = "http://dev.markitondemand.com/MODApis/Api/v2/Lookup/json?input=" + req.params.query;
  request.get(url, function(error, response, body) {
    // var results = JSON.parse(body);
    res.send(body);
  })
});



module.exports = router;
