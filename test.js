var userService = require('./userService.js');

var colors = require('colors');
var logPrefix = "Test: ".cyan;

const request = require('request');

var address = "0x3f505d300c0Bc0E0d313EC35f189ffE90cdF05ec";
request('https://faucet.ropsten.be/donate/'+address, { json: true }, (err, res, body) => {
  if (err) {
     return console.log(err);
  }
  console.log(JSON.stringify(body));
  console.log(body.explanation);
});


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
