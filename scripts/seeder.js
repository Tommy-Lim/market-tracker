var models = require('../models/schemas');
var mongoose = require('mongoose');
mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost/markettracker');

// CREATE STOCKS

var appleStock = {
  name: "Apple",
  symbol: "AAPL"
}

var googleStock = {
  name: "Google",
  symbol: "GOOGL"
}

function createStock(newStock){
  models.Stock.findOne({
    name: newStock.name
  }, function(err, stock){
    console.log("err: ", err);
    console.log("stock: ", stock);
    if(!stock){
      models.Stock.create(
        newStock,
        function(err, created){
          console.log("created stock: ", created.name);
        }
      )
    } else{
      console.log("stock found: ", stock.name);
    }
  })
}

createStock(appleStock);
createStock(googleStock);


// CREATE USERS

var user1 = {
  email: "user1@email.com",
  password: "password"
}

var user2 = {
  email: "user2@email.com",
  password: "password"
}

function createUser(newUser){
  models.User.findOne({
    email: newUser.email
  }, function(err, user){
    console.log("err: ", err);
    console.log("user: ", user);
    if(!user){
      console.log("going to create new user");
      models.User.create(
        newUser,
        function(err, created){
          console.log("created user: ", created.email);
        }
      )
    } else{
      console.log("user found: ", user.email);
    }
  })
}

createUser(user1);
createUser(user2);


// CREATE PURCHASED

var purchased1 = {
  userEmail: "user2@email.com",
  stock: {
    name: "Apple",
    symbol: "AAPL"
  },
  quantity: 10
}

var purchased2 = {
  userEmail: "user1@email.com",
  stock: {
    name: "Google",
    symbol: "GOOGL"
  },
  quantity: 15
}

function createPurchased(newPurchase){
  console.log("going to create purchase", newPurchase.stock.name, "for", newPurchase.userEmail);
  models.Purchased.findOne({
    'userEmail': newPurchase.userEmail,
    'stock.name': newPurchase.stock.name
  }, 'userEmail stock', function(err, purchase){
    console.log("purchase error: ", err);
    console.log("purchase found: ", purchase);
    if(!purchase){
      models.Purchased.create(
        newPurchase,
        function(err, created){
          console.log("purchase created: ", created.stock.name);
          models.User.findOne({
            email: newPurchase.userEmail
          }, function(err, user){
            console.log("found user: ", user.email);
            console.log("add to user created:", created);
            user.purchased.push(created);
            user.save();
          })

        }
      )
    } else{
      console.log("purchase found: ", newPurchase.stock.name, "for", newPurchase.userEmail);
    }
  })
}

createPurchased(purchased1);
createPurchased(purchased2);
