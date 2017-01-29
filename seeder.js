var models = require('./models/schemas');
var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/markettracker');

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
