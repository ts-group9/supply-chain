var walletHelper = require('./walletHelper.js');
var mongoHelper = require('./mongoHelper.js')
var contractHelper = require('./contractHelper.js')

var colors = require('colors');
var logPrefix = "User service: ".blue;

exports.createUser = function(req){
  return walletHelper.createWallet().then(function(wallet){
    var user = req;
    user['wallet'] = wallet;
    mongoHelper.saveUser(user);
    contractHelper.addUser(wallet.address,user.name,user.role);
    console.log(logPrefix+" Saved user details:"+user);

    return user;
  });
}

exports.getUserWallet = function(userName,password){
  return mongoHelper.getUserDetails(userName,password).then(function(user) {
    if(user){
      console.info(logPrefix+'Fetched details for user name:'+userName);
      return walletHelper.getUserWallet(user.wallet.privateKey).then(function(wallet){
        if(wallet){
          return wallet;
        }else{
          console.log(logPrefix+"Failed to create wallet object");
        }
      });
    }else{
      console.log(logPrefix+"User not found with given details!");
    }
  }, function(err) {
    console.error(logPrefix+'The promise was rejected', err, err.stack);
  });
}


exports.getUser = function(email,password){
  return mongoHelper.getUserDetails(email,password).then(function(user) {
    if(user){
      console.info(logPrefix+'Fetched details for user name:'+user.userName);
      return user;
    }else{
      console.log(logPrefix+"User not found with given details!");
    }
  });
}
