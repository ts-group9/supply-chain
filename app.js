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
.post(function(req,res){
  console.log(logPrefix+"API hit: POST /login");
  return userService.getUser(req.body.email,req.body.password).then(function(user){
    if(user){
      setSessionDetails(user);
      res.render('index',{session:session});
    }else{
      var msg = "Invalid username or password; please try again"
      res.render('login',{session:session,msg:msg});
    }
  });
});

app.route('/profile')
.get(function(req,res){
  console.log(logPrefix+"API hit: GET /profile");
  res.render('profile',{session:session});
})

app.route('/logout')
.get(function(req,res){
  console.log(logPrefix+"API hit: GET /logout");
  session = {};
  res.render('home',{session:session});
})

app.route('/')
.get(function(req,res){
  console.log(logPrefix+"API hit: GET /");
  if(session.userName){
    res.render('index',{session:session})
  }else{
    res.render('home',{session:session});
  }
});

/* Don't need
app.route('/register')
.get(function(req,res){
  console.log(logPrefix+"API hit: GET /register");
  res.render('register',{session:session})
});
*/

app.route('/addProduct')
.get(function(req,res){
  console.log(logPrefix+"API hit: GET /addProduct");
  if(session.userName){
    res.render('addProduct',{session:session});
  }else{
    res.render('home',{session:session});
  }
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
  // TODO: create getAllProduct() in contractHelper
  //var prods = productService.getAll();
  return productService.getAll().then(function(products){
    //console.log(logPrefix+"Products :: "+ JSON.stringify(products));
    res.render('products',{list:products,session:session});
  });
});

app.route('/users')
.post(function(req,res){
  console.log(logPrefix+"API hit: POST /users");
  console.log(logPrefix+"User details:"+JSON.stringify(req.body));
  userService.createUser(req.body).then(function(user){
    console.log(logPrefix+"Added user!");
    setSessionDetails(user);
    res.render('index',{session:session});
  });
});
var roles = {};
roles[0] = "Producer";
roles[1] = "Supplier";
roles[2] = "Consumer";
roles[3] = "Regulator";

var setSessionDetails = function(user){
  session['userName'] = user.name;
  session['role'] = roles[user.role];
  session['email'] = user.email;
  session['accountAddress'] = user.wallet.address;
  session['balance'] = 1.618; //user.balance;

  console.log(logPrefix+"session:"+JSON.stringify(session));
}

app.route('/products')
.post(function(req,res){
  console.log(logPrefix+"API hit: POST /products");
  console.log(logPrefix+"Product details:"+JSON.stringify(req.body));
  return productService.addProduct(session.accountAddress,req.body).then(function(txId){
    console.log(logPrefix + "Added Product!!");
    var msg = "Last transaction id:"+JSON.stringify(txId.hash);
    res.render('addProduct',{session:session,msg:msg});
  });
});

app.route('/productDetails')
.post(function(req,res){
  console.log(logPrefix+"API hit: POST /productDetails");
  var productId = req.body.productId;
  return productService.getProduct(req.body.productId).then(function(detail){
    res.render('productDetails',{product:detail,session:session});
  });
  });

app.route('/verifyProduct')
.get(function(req,res){
  console.log(logPrefix+"API hit: GET /verifyProduct");
      res.render('verifyProduct',{session:session});
});

app.route('/verifyProduct')
  .post(function(req,res){
    console.log(logPrefix+"API hit: POST /verifyProduct, req = " + JSON.stringify(req.body));
    console.log(logPrefix+"accountAddress - " + session.accountAddress);
    return productService.verifyProduct(session.accountAddress,req.body.productId).then(function(detail){
      console.log("details : " + JSON.stringify(detail))
      res.render('productDetails',{product:detail,session:session});
    });
    });

app.route('/transferOwnership')
  .get(function(req,res){
    console.log(logPrefix+"API hit: GET /transferOwnership");
    if(session.userName){
      res.render('transferOwnership',{session:session});
    }else{
      res.render('home',{session:session});
    }
});

app.route('/transferOwnership')
  .post(function(req,res){
    console.log(logPrefix+"API hit: POST /transferOwnership, req = " + JSON.stringify(req.body));
    return productService.transferOwnership(session,req.body.newOwner,req.body.productId).then(function(detail){
      console.log("details : " + JSON.stringify(detail))
      res.render('productDetails',{product:detail,session:session});
    });
  });
