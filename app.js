var express = require('express');
var colors = require('colors');
var bodyParser = require('body-parser');

var userService = require('./userService.js');

var logPrefix = "App: ".cyan;

var app = express();
app.set('view engine','pug');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

var server = app.listen(3000);

app.route('/')
.get(function(req,res){
  console.log(logPrefix+"API hit: GET /");
  res.render('register')
});

app.route('/users')
.post(function(req,res){
  console.log(logPrefix+"API hit: POST /users");
  console.log(logPrefix+"User details:"+JSON.stringify(req.body));
  userService.createUser(req.body);
  res.write("Created user!");
  return res.end();
});

app.post('/signup', function(req,res){
  console.log(req.body);
})
