var userService = require('./userService.js');
var contractHelper = require('./contractHelper.js');
var mongoHelper = require('./mongoHelper.js')

var addProductDetailsFromDB = function(productId,product){
  return mongoHelper.getProductDetails(productId).then(function(mongoProduct){
    mongoProduct['IsVerified'] = product.IsVerified;
    mongoProduct['ownerName'] = product.ownerName;
    return mongoProduct;
  });
}

var getProduct = function(productId){
  return contractHelper.getProduct(productId).then(function(product){
    return addProductDetailsFromDB(productId,product);
  });
}

var addProduct = function(address,req){
  req['productId'] = Math.random().toString(36).substr(2);
  req['addedOn'] = new Date();
  mongoHelper.saveProduct(req);
  //var address = "3f505d300c0Bc0E0d313EC35f189ffE90cdF05ec";//JSON.stringify(user.wallet.address);
  return contractHelper.addProduct(address,req.productId,req.productName);
}

var getAll = function(){
  return mongoHelper.getAllProducts().then(function(products){
    return products;
  });
}

exports.addProduct = addProduct;
  var verifyProduct = function(address,productId){
  //var address = "3f505d300c0Bc0E0d313EC35f189ffE90cdF05ec";//JSON.stringify(user.wallet.address);
  return contractHelper.verifyProduct(address,productId);
}

var transferOwnership = function(session,newOwnerEmail,productId){
  return userService.getUserFromEmail(newOwnerEmail).then(function(user){
    return contractHelper.transferOwnership(session,productId,user).then(function(product){
      return addProductDetailsFromDB(productId,product);
    });
  });
}

exports.addProduct = addProduct;
exports.getAll = getAll;
exports.verifyProduct = verifyProduct;
exports.transferOwnership = transferOwnership;
exports.getProduct = getProduct;
