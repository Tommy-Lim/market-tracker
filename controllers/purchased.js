var express = require('express');
var router = express.Router();
var models = require('../models/schemas');
var mongoose = require('mongoose');

// Routes....

router.route('/')
.get(function(req, res){
  return res.send({msg: "purchased / get route hit"});
})

router.route('/:id')
.get(function(req, res){
  return res.send({msg: "purchased /:id get route hit", id: req.params.id});
})


module.exports = router;
