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
