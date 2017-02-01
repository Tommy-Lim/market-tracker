var express = require('express');
var router = express.Router();
var models = require('../models/schemas');
var mongoose = require('mongoose');

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

router.route('/watchlist')
.get(function(req, res){
  models.User.findOne({
    email: req.user.email
  }, function(err, user){
    if(!user){
      console.log("no user found");
    } else{
      if(!user.watchlist){
        res.send({msg: "watchlist empty", watchlist: []});
      } else{
        res.send({watchlist: user.watchlist});
      }
    }
  })

})

router.route('/purchased')
.get(function(req, res){

  models.User.findOne({
    email: req.user.email
  }, function(err, user){
    console.log("user: ", user);
    if(!user){
      console.log("no user found");
    } else{
      if(!user.purchased){
        res.send({msg: "purchases empty", purchases: []});
      } else{
        res.send({purchases: user.purchased});
      }
    }
  })

})

router.route('/watch/:symbol')
.post(function(req, res){

  models.User.findOne({
    email: req.user.email
  }, function(err, user){
    if(!user){
      console.log("user not found");
    } else{
      user.watchlist.push(req.params.symbol);
      user.save();
      res.send({
        msg: req.params.symbol + " added to " + req.user.email + "'s watchlist"
      });
    }
  })

})
.delete(function(req, res){

  models.User.findOne({
    email: req.user.email
  }, function(err, user){
    if(!user){
      console.log("user not found");
    } else{
      console.log("before", user.watchlist);
      user.watchlist.splice(user.watchlist.indexOf(req.params.symbol), 1);
      console.log("after", user.watchlist);
      user.save();
      res.send({
        msg: req.params.symbol + " added to " + req.user.email + "'s watchlist"
      });
    }
  })

})

router.route('/buy')
.post(function(req, res){

  var newPurchase = {
    userEmail: req.user.email,
    stock: req.body.data.stock,
    quantity: req.body.data.quantity
  }

  console.log(newPurchase);

  models.Purchased.create(
    newPurchase,
    function(err, created){
      console.log("purchase created: ", created.stock.Name);
      models.User.findOne({
        email: newPurchase.userEmail
      }, function(err, user){
        console.log("found user: ", user.email);
        console.log("add to user created:", created);
        user.purchased.push(created);
        user.save();
        res.send({
          msg: req.body.data.quantity + " " + created.stock.Name + " shares bought by " + req.user.email + "'s watchlist"
        })
      })

    }
  )


})


module.exports = router;
