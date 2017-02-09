var express = require('express');
var router = express.Router();
var models = require('../models/schemas');
var mongoose = require('mongoose');
var request = require('request');


router.route('/')
.get(function(req, res) {
  var url = 'https://newsapi.org/v1/articles?source=bloomberg&sortBy=top&apiKey=' + process.env.NEWS_API_KEY;
  request.get(url, function(error, response, body) {
    res.send(body);
  })
})
.post(function(req, res) {
  console.log("post route hit")
  var url = 'https://newsapi.org/v1/articles?source=bloomberg&sortBy=top&apiKey=' + process.env.NEWS_API_KEY;
  request.get(url, function(error, response, body) {
    res.send(body);
  })
})

module.exports = router;
