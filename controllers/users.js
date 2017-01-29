var express = require('express');
var router = express.Router();
var models = require('../models/schemas');
var mongoose = require('mongoose');
// mongoose.connect('mongodb://localhost/markettracker');


// Routes...

router.route('/')
.get(function(req, res){
  return res.send({msg: "users / get route hit"});
})


module.exports = router;
