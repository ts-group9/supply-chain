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

var session = {};

app.route('/login')
.get(function(req,res){
  console.log(logPrefix+"API hit: GET /login");
  res.render('login',{session:session});
})
.post(function(req,res){
  console.log(logPrefix+"API hit: POST /login");
  return userService.getUser(req.body.userName,req.body.password).then(function(user){
    if(user){
      session['userName'] = user.name;
      session['role'] = user.role;
      session['email'] = user.email;
      session['accountAddress'] = user.wallet.address;

      res.render('index',{session:session,msg:"Hi "+user.name});
    }else{
      var msg = "Invalid username or password; please try again"
      res.render('login',{session:session,msg:msg});
    }
  });
});

app.route('/logout')
.get(function(req,res){
  console.log(logPrefix+"API hit: GET /logout");
  session = {};
  res.render('login',{session:session});
})

app.route('/')
.get(function(req,res){
  console.log(logPrefix+"API hit: GET /");
  res.render('index',{session:session})
});

app.route('/register')
.get(function(req,res){
  console.log(logPrefix+"API hit: GET /register");
  res.render('register',{session:session})
});

app.route('/addProduct')
.get(function(req,res){
  console.log(logPrefix+"API hit: GET /addProduct");
  res.render('addProduct',{session:session});
});

app.route('/getProduct')
.get(function(req,res){
  console.log(logPrefix+"API hit: GET /getProduct");
  res.render('getProduct',{session:session});
});

app.route('/productDetails')
.get(function(req,res){
  console.log(logPrefix+"API hit: GET /productDetails");
  res.render('productDetails',{session:session});
});

app.route('/allProducts')
.get(function(req,res){
  console.log(logPrefix+"API hit: GET /allProducts");
  //var prods = productService.getAll();
  var prod = {};
  prod['status'] = 'vefified';
  prod['owner'] = 'Sanjeev';
  prod['name'] = 'Prod 1';
  prod['id'] = '101';

  var prods = [];
  prods.push(prod);
  prods.push(prod);
  prods.push(prod);

  res.render('products',{list:prods,prod1:prod,session:session});
});

app.route('/users')
.post(function(req,res){
  console.log(logPrefix+"API hit: POST /users");
  console.log(logPrefix+"User details:"+JSON.stringify(req.body));
  userService.createUser(req.body);
  console.log(logPrefix+"Added user!");
  res.render('register',{session:session});
});

app.route('/products')
.post(function(req,res){
  console.log(logPrefix+"API hit: POST /products");
  console.log(logPrefix+"Product details:"+JSON.stringify(req.body));
  productService.addProduct(req.body);
  console.log(logPrefix+"Added product!");
  res.render('addProduct',{session:session});
});

app.route('/productDetails')
.post(function(req,res){
  console.log(logPrefix+"API hit: POST /productDetails");
  return productService.getProduct(req.body.productId).then(function(detail){
    res.render('productDetails',{product:detail,session:session});
  });
});
