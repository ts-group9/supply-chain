var ethers = require('ethers');
var randomHex = require('randomhex');

var colors = require('colors');
var logPrefix = "Wallet helper: ".magenta;

var createWallet = function(){
  return new Promise(function (resolve, reject) {
    var privateKey = randomHex(32);
    var wallet = new ethers.Wallet(privateKey);
    // Connect a wallet to network
    var provider = ethers.getDefaultProvider('ropsten');
    var walletWithProvider = new ethers.Wallet(privateKey, provider);

    console.log(logPrefix+"Created new wallet!");
    resolve(walletWithProvider);
    
    return walletWithProvider;
  });
}

var getUserWallet  = function(privateKey){
  return new Promise(function (resolve, reject) {
    var wallet = new ethers.Wallet(privateKey);
    console.log(logPrefix+"Created wallet object");
    resolve(wallet);
    return wallet;
  })
};

exports.createWallet = createWallet;
exports.getUserWallet = getUserWallet;
