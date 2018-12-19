var userService = require('./userService.js');
var contractHelper = require('./contractHelper.js');

var senetize = function(address){
  console.log("addr::::"+JSON.stringify(address));
  var add = JSON.stringify(address);
  return add.replace("0x","");;
}

var getProduct = function(productId){
  return contractHelper.getProduct(productId).then(function(product){
    return product;
  });
}
exports.getProduct = getProduct;

var addProduct = function(address,req){
  //var address = "3f505d300c0Bc0E0d313EC35f189ffE90cdF05ec";//JSON.stringify(user.wallet.address);
  contractHelper.addProduct(address,req.productId,req.productName);
}
exports.addProduct = addProduct;

var getAll = function(){
  return contractHelper.getAllProducts().then(function(products){
    return products;
  });
}
exports.getAll = getAll;

exports.addProduct = addProduct;

var verifyProduct = function(address,productId){
  //var address = "3f505d300c0Bc0E0d313EC35f189ffE90cdF05ec";//JSON.stringify(user.wallet.address);

  return contractHelper.verifyProduct(address,productId);
}

exports.verifyProduct = verifyProduct;

var transferOwnership = function(curOwnerAddress,newOwnerEmail,productId){
  //var address = "3f505d300c0Bc0E0d313EC35f189ffE90cdF05ec";//JSON.stringify(user.wallet.address);
  return userService.getUserFromEmail(newOwnerEmail).then(function(user){

    var newOwnerAddress = user.wallet.address;
    curOwnerAddress = curOwnerAddress;
    console.log("newOwnerAddress:"+newOwnerAddress);
    console.log("curOwnerAddress:"+curOwnerAddress);

    return contractHelper.transferOwnership(curOwnerAddress,productId,newOwnerAddress);
  });
}

exports.transferOwnership = transferOwnership;
