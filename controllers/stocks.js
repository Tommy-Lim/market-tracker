var express = require('express');
var router = express.Router();
var models = require('../models/schemas');
var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/markettracker');


// Routes....


module.exports = router;
