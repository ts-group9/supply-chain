
var mongoClient = require('mongodb').MongoClient;
var url = 'mongodb://localhost:27017/';

var colors = require('colors');
var logPrefix = "Mongo helper: ".green;

exports.getUserDetails = function(email,password){
  return mongoClient.connect(url,{useNewUrlParser: true}).then(function(db){
    console.log(logPrefix+'Connected to mongodb @ '+url);

    var collection = db.db('test').collection('users');
    return collection.findOne({"email":email,"password" : password});
  }).then(function(user){
    return user;
  });
}

exports.getProductDetails = function(productId){
  return mongoClient.connect(url,{useNewUrlParser: true}).then(function(db){
    console.log(logPrefix+'Connected to mongodb @ '+url);

    var collection = db.db('test').collection('products');
    return collection.findOne({"productId":productId});
  }).then(function(product){
    return product;
  });
}

exports.getUserFromEmail = function(email){
  return mongoClient.connect(url,{useNewUrlParser: true}).then(function(db){
    console.log(logPrefix+'Connected to mongodb @ '+url);

    var collection = db.db('test').collection('users');
    return collection.findOne({"email":email});
  }).then(function(user){
    return user;
  });
}

exports.getAllUsers = function() {
  return mongoClient.connect(url,{useNewUrlParser: true}).then(function(db){
    console.log(logPrefix+'Connected to mongodb @ '+url);

    var collection = db.db('test').collection('users');
    return collection.find().toArray();
  }).then(function(users) {
    console.log(logPrefix+"Users:"+users);
    return users;
  });
}

exports.getAllProducts = function() {
  return mongoClient.connect(url,{useNewUrlParser: true}).then(function(db){
    console.log(logPrefix+'Connected to mongodb @ '+url);

    var collection = db.db('test').collection('products');
    return collection.find().toArray();
  }).then(function(products) {
    //console.log(logPrefix+"Products in mongo:"+JSON.stringify(products));
    return products;
  });
}

exports.saveUser = function(req){
  mongoClient.connect(url,{useNewUrlParser: true},function(err,db){
    if(err){
      throw err;
    }
    console.log(logPrefix+'Connected to mongodb @ '+url);
    var dbo = db.db('test');
    dbo.collection("users").insertOne(req, function(err, res) {
      if (err) throw err;
      console.log(logPrefix+"User details inserted");
      db.close();
    });
  });
}

exports.saveProduct = function(req){
    mongoClient.connect(url,{useNewUrlParser: true},function(err,db){
      if(err){
        throw err;
      }
      console.log(logPrefix+'Connected to mongodb @ '+url);
      var dbo = db.db('test');
      dbo.collection("products").insertOne(req, function(err, res) {
        if (err) throw err;
        console.log(logPrefix+"Product details inserted:"+JSON.stringify(req));
        db.close();
      });
    });
}

exports.logTransferOwnership = function(oldOwnerEmail,newOwnerEmail,productId,tx){
  var log = {};
  log['oldOwnerEmail'] = oldOwnerEmail;
  log['newOwnerEmail'] = newOwnerEmail;
  log['tx'] = tx;
  log['updateOn'] = new Date();
  log['txLink'] = tx.hash.substring(0,8);;
  var update = { $push: { logs: log } };
  var query = { productId:productId};
  mongoClient.connect(url,{useNewUrlParser: true},function(err,db){
    if(err){
      throw err;
    }
    console.log(logPrefix+'Connected to mongodb @ '+url);
    var dbo = db.db('test');
    dbo.collection("products").updateOne(query,update, function(err, res) {
      if (err) throw err;
      console.log(logPrefix+"Product details inserted");
      db.close();
    });
  });
}

exports.getLastProduct = function(productId){
  return mongoClient.connect(url,{useNewUrlParser: true}).then(function(db){
    console.log(logPrefix+'Connected to mongodb @ '+url);
    var sortQuery = { _id:-1};
    var collection = db.db('test').collection('products');
    return collection.find().sort(sortQuery).limit(1).toArray();
  }).then(function(product){
    return product;
  });
}
