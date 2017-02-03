var express = require('express');
var router = express.Router();
var models = require('../models/schemas');
var mongoose = require('mongoose');

// Routes...


// POST - USER SIGN UP
router.route('/')
.post(function(req, res){
  models.User.findOne({email: req.body.email}, function(err, user){
    if(user){
      return res.status(400).send({message: "Email already exists"});
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

// GET - GET USER WATCHLIST SYMBOLS
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

// GET - GET USER PURCHASED OBJECTS {STOCK, QUANTITY}
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

// POST - ADD SYMBOL TO USER WATCHLIST
// DELETE - REMOVE SYMBOL FROM USER WATCHLIST
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
        msg: req.params.symbol + " deleted from " + req.user.email + "'s watchlist"
      });
    }
  })

})

// POST - BUY STOCK AND SAVE CURRENT STOCK AND QUANTITY IN PURCHASES
router.route('/buy/')
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

// DELETE - DELETE PURCHASE WITH OBJECTID
router.route('/buy/:id')
.delete(function(req, res){

  models.User.findOne({
    email: req.user.email
  }, function(err, user){
    if(!user){
      res.send({message: 'User not found'})
    } else{
      user.purchased.forEach(function(purchase, index){
        if(purchase._id == req.params.id){
          user.purchased.splice(index, 1);
          user.save(function(err, updatedUser){
            if(err) return handleError(err);
            res.send(updatedUser);
          })
        } else if(purchase._id != req.params.id && index == user.purchased.length-1){
          res.send({message: 'Error, no matching purchase found.'})
        }
      })

    }
  })

})


module.exports = router;
