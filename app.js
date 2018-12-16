var express = require('express');
var colors = require('colors');
var bodyParser = require('body-parser');

var userService = require('./userService.js');
var productService = require('./productService.js');

var logPrefix = "App: ".cyan;

var app = express();
app.set('view engine','pug');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

var server = app.listen(3000);

app.route('/')
.get(function(req,res){
  console.log(logPrefix+"API hit: GET /");
  res.render('index')
});

app.route('/register')
.get(function(req,res){
  console.log(logPrefix+"API hit: GET /register");
  res.render('register')
});

app.route('/addProduct')
.get(function(req,res){
  console.log(logPrefix+"API hit: GET /addProduct");
  res.render('addProduct');
});

app.route('/getProduct')
.get(function(req,res){
  console.log(logPrefix+"API hit: GET /getProduct");
  res.render('getProduct');
});

app.route('/productDetails')
.get(function(req,res){
  console.log(logPrefix+"API hit: GET /productDetails");
  res.render('productDetails');
});

app.route('/allProducts')
.get(function(req,res){
  console.log(logPrefix+"API hit: GET /allProducts");
  res.render('productDetails');
});

app.route('/users')
.post(function(req,res){
  console.log(logPrefix+"API hit: POST /users");
  console.log(logPrefix+"User details:"+JSON.stringify(req.body));
  userService.createUser(req.body);
  console.log(logPrefix+"Added user!");
  res.render('register')
});

app.route('/products')
.post(function(req,res){
  console.log(logPrefix+"API hit: POST /products");
  console.log(logPrefix+"Product details:"+JSON.stringify(req.body));
  productService.addProduct(req.body);
  console.log(logPrefix+"Added product!");
  res.render('addProduct')
});

app.route('/productDetails')
.post(function(req,res){
  console.log(logPrefix+"API hit: POST /productDetails");
  return productService.getProduct(req.body.productId).then(function(detail){
    res.render('productDetails',{product:{name:detail.name,owner:detail.ownerName,isVerified:detail.IsVerified}});
  });
});
