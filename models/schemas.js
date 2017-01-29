var mongoose = require('mongoose');
var bcrypt = require('bcrypt');

// STOCK SCHEMA

var StockSchema = new mongoose.Schema({
  name: String,
  symbol: String,
  exchange: String,
  lastPrice: Number,
  change: Number,
  changePercent: Number,
  timestamp: String,
  msDate: Number,
  marketCap: Number,
  volume: Number,
  changeYTD: Number,
  changePercentYTD: Number,
  high: Number,
  low: Number,
  open: Number
},{
  collection: 'Stocks'
});
var Stock = mongoose.model('Stock', StockSchema);

// PURCHASED SCHEMA

var PurchasedSchema = new mongoose.Schema({
  stock: StockSchema,
  quantity: Number,
},{
  collection: 'Purchased'
});
var Purchased = mongoose.model('Purchased', PurchasedSchema);

// USER SCHEMA

var UserSchema = new mongoose.Schema({
  name: String,
  email: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type:  String,
    required: true
  },
  watchlist: [StockSchema],
  purchased: [PurchasedSchema]
},{
  collection: 'Users'
});

UserSchema.set('toJSON', {
  transform: function(doc, ret, options){
    var returnJson = {
      id: ret._id,
      email: ret.email,
      name: ret.name
    }
    return returnJson;
  }
});

UserSchema.methods.authenticated = function(password){
  var user = this;
  var isAuthenticated = bcrypt.compareSync(password, user.password);
  return isAuthenticated ? user : false;
}

UserSchema.pre('save', function(next){
  if(!this.isModified('password')){
    next();
  } else{
    this.password = bcrypt.hashSync(this.password, 10);
  }
})

var User = mongoose.model('User', UserSchema);


// EXPORTS

module.exports = {
  Stock: Stock,
  Purchased: Purchased,
  User: User
};
