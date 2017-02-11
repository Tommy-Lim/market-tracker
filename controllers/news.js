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

router.route('/:query')
.get(function(req, res) {
  req.params.query = encodeURIComponent(req.params.query);
  console.log("get route hit: ", req.params.query)
  var url = 'http://webhose.io/search?token='+ process.env.WEBHOSE_API_KEY +'&format=json&q=%22' + req.params.query + '%22%20language%3A(english)%20thread.country%3AUS%20site%3Amarketwatch.com%20(site_type%3Anews)&sort=relevancy&ts=1486418270339';
  request.get(url, function(error, response, body) {
    res.send(body);
  })
})

module.exports = router;
