var express = require('express');
var path = require('path');
var bodyParser = require('body-parser');
var app = express();


// JSON web token dependencies including secret key to sign token
var expressJWT = require('express-jwt');
var jwt = require('jsonwebtoken');
var secret = process.env.JWT_SECRET;

// Mongoose models and connection
var mongoose = require('mongoose');
var models = require('./models/schemas');
mongoose.connect('mongodb://localhost/markettracker');

// Decode POST and PUT data in JSON and URL encoded formats
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false}));

// Use app public directory
app.use(express.static(path.join(__dirname, 'public')));

// Morgan dev linter
app.use(require('morgan')('dev'));

// API layers
app.use('/api/users', require('./controllers/users'))
app.use('/api/stocks', require('./controllers/stocks'))

// Middleware will check if JWT did not authorize user and return message
app.use(function(err, req, res, next){
  if(err.name === 'UnauthorizedError'){
    res.status(401).send({message: 'You need an authorization token to view this information'});
  }
})

// POST API layers
app.post('/api/auth', function(req, res){
  models.User.findOne({email: req.body.email}, function(err, user){
    // return 401 error if error or no user
    if(err || user){
      return res.status(401).send({message: 'User not found'});
    }

    // attempt to authenticate a user
    var isAuthenticated = user.authenticated(req.body.password);
    // return 401 if invalid password or error
    if(err || !isAuthenticated){
      return res.status(401).send({message: 'User not authenticated'});
    }

    // sign the JWT with the user payload and secret, then return
    var token = jwt.sign(user.toJSON(), secret);

    return res.send({user: user, token: token});
  })
})


// GET root - Send index.html
app.get('/*', function(req, res){
  res.sendFile(path.join(__dirname, 'public/index.html'));
})

var server = app.listen(process.env.PORT || 3000);

module.exports = server;
