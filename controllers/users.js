var express = require('express');
var router = express.Router();
var models = require('../models/schemas');
var mongoose = require('mongoose');
// mongoose.connect('mongodb://localhost/markettracker');


// Routes...

router.route('/')
.get(function(req, res){
  return res.send({msg: "auth / get route hit"});
})
.post(function(req, res){
  models.User.findOne({email: req.body.email}, function(err, user){
    if(user){
      return res.status(400).send({message: "email already exists"});
    } else{
      models.User.create(req.body, function(err, created){
        if(err){
          return res.status(500).send(err);
        } else{
          return res.send(user);
        }
      })
    }
  })
})

router.route('/:id')
.get(function(req, res){
  return res.send({msg: "auth /:id get route hit", id: req.params.id});
})


module.exports = router;
