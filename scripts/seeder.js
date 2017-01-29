var models = require('../models/schemas');
var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/markettracker');

// CREATE STOCKS

var appleStock = {
  name: "Apple",
  symbol: "AAPL"
}

var googleStock = {
  name: "Google",
  symbol: "GOOGL"
}

models.Stock.findOne({
  name: "Apple"
}, function(err, stock){
  console.log("err: ", err);
  console.log("stock: ", stock);
  if(!stock){
    models.Stock.create(
      appleStock,
      function(err, created){
        console.log("created stock");
      }
    )
  } else{
    console.log("stock found");
  }
})

models.Stock.findOne({
  name: "Apple"
}, function(err, stock){
  console.log("err: ", err);
  console.log("stock: ", stock);
  if(!stock){
    models.Stock.create(
      appleStock,
      function(err, created){
        console.log("created stock");
      }
    )
  } else{
    console.log("stock found");
  }
})

models.Stock.findOne({
  name: "Google"
}, function(err, stock){
  console.log("err: ", err);
  console.log("stock: ", stock);
  if(!stock){
    models.Stock.create(
      googleStock,
      function(err, created){
        console.log("created stock");
      }
    )
  } else{
    console.log("stock found");
  }
})


// CREATE USERS

var user1 = {
  email: "user1@email.com",
  password: "password"
}

var user2 = {
  email: "user2@email.com",
  password: "password"
}

models.User.findOne({
  email: "user1@email.com"
}, function(err, user){
  console.log("err: ", err);
  console.log("user: ", user);
  if(!user){
    console.log("going to create user...");
    models.User.create(
      user1,
      function(err, created){
        console.log("created user");
      }
    )
  } else{
    console.log("user found");
  }
})

models.User.findOne({
  email: "user1@email.com"
}, function(err, user){
  console.log("err: ", err);
  console.log("user: ", user);
  if(!user){
    console.log("going to create user...");
    models.User.create(
      user1,
      function(err, created){
        console.log("created user");
      }
    )
  } else{
    console.log("user found");
  }
})

models.User.findOne({
  email: "user2@email.com"
}, function(err, user){
  console.log("err: ", err);
  console.log("user: ", user);
  if(!user){
    console.log("going to create user...");
    models.User.create(
      user2,
      function(err, created){
        console.log("created user");
      }
    )
  } else{
    console.log("user found");
  }
})
