var userService = require('./userService.js');
var contractHelper = require('./contractHelper.js');

var getProduct = function(productId){
  return contractHelper.getProduct(productId).then(function(product){
    return product;
  });
}
exports.getProduct = getProduct;

var addProduct = function(req){
  var address = "3f505d300c0Bc0E0d313EC35f189ffE90cdF05ec";//JSON.stringify(user.wallet.address);
  contractHelper.addProduct(address,req.productId,req.productName);
}
/*
function(req){
  return userService.getUser(req.userName,req.password).then(function(user){
    var address = "3f505d300c0Bc0E0d313EC35f189ffE90cdF05ec";//JSON.stringify(user.wallet.address);
    contractHelper.addProduct(address,req.productId,req.productName);
  });
}
*/

exports.addProduct = addProduct;

var verifyProduct = function(productId){
  var address = "3f505d300c0Bc0E0d313EC35f189ffE90cdF05ec";//JSON.stringify(user.wallet.address);
  return contractHelper.verifyProduct(address,productId);
}

exports.verifyProduct = verifyProduct;

var transferOwnership = function(productId,newOwner){
  var address = "3f505d300c0Bc0E0d313EC35f189ffE90cdF05ec";//JSON.stringify(user.wallet.address);
  newOwner = address;
  return contractHelper.transferOwnership(address,productId,newOwner);
}

exports.transferOwnership = transferOwnership;
