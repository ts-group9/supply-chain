var userService = require('./userService.js');

var colors = require('colors');
var logPrefix = "Test: ".cyan;

userService.getUserWallet("Govind2","eth234").then(function(wallet){
  console.log(logPrefix+" wallet: "+JSON.stringify(wallet));
  console.log(logPrefix+" wallet address: "+JSON.stringify(wallet.address));
});

userService.createUser("Govind2","eth234");

/*
// Connect a wallet to mainnet
var provider = ethers.getDefaultProvider('ropsten');
var walletWithProvider = new ethers.Wallet(privateKey, provider);

console.log("Wallet:"+JSON.stringify(walletWithProvider,null,2));

walletWithProvider.getBalance().then(function(bal){
  console.log(bal);
});



/*
dao.getAllUsers().then(function(users) {
  console.info('Total users in db:'+users.length);
}, function(err) {
  console.error('The promise was rejected', err, err.stack);
});
*/

/*
dao.getUserDetails('Sanjeev').then(function(user) {
  if(user){
    console.info('User name:'+user.name+" key:"+user.key);
  }else{
    console.log("User not found!");
  }
}, function(err) {
  console.error('The promise was rejected', err, err.stack);
});
*/
