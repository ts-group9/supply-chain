var userService = require('./userService.js');
var contractHelper = require('./contractHelper.js');
var mongoHelper = require('./mongoHelper.js')

var addProductDetailsFromDB = function(mongoProduct,product){
    if(product){
      mongoProduct['IsVerified'] = product.IsVerified;
      mongoProduct['ownerName'] = product.ownerName;
    }else{
      mongoProduct['IsVerified'] = true;
      mongoProduct['ownerName'] = session.userName;
    }
    return mongoProduct;
}

var getProduct = function(productId){
  return mongoHelper.getProductDetails(productId).then(function(mongoProduct){
    if(!mongoProduct) return false;
    return contractHelper.getProduct(productId).then(function(product){
      return addProductDetailsFromDB(mongoProduct,product).then(function(mongoProduct){
        return mongoProduct;
      });
    });
  });
}

var addProduct = function(address,req){
  return mongoHelper.getLastProduct().then(function(products){
    var lastProduct = products[0];
    if(lastProduct){
      if(lastProduct.seq){
        req['seq'] = lastProduct.seq+1;
      }
      else {
        req['seq'] = 1001;
      }
    }else{
      req['seq'] = 1001;
    }
    req['productId'] = "PR-"+req.seq;
    req['addedOn'] = new Date();
    req['logs'] = [];
    mongoHelper.saveProduct(req);
    //var address = "3f505d300c0Bc0E0d313EC35f189ffE90cdF05ec";//JSON.stringify(user.wallet.address);
    return contractHelper.addProduct(address,req.productId,req.productName);
  });
}

var getAll = function(){
  return mongoHelper.getAllProducts().then(function(products){
    return products;
  });
}

var verifyProduct = function(address,productId){
  return mongoHelper.getProductDetails(productId).then(function(mongoProduct){
  if(!mongoProduct) return false;
    return contractHelper.verifyProduct(address,productId).then(function(product){
      return addProductDetailsFromDB(mongoProduct,product).then(function(mongoProduct){
        return mongoProduct;
      });
    });
  });
}

var transferOwnership = function(session,newOwnerEmail,productId){
  return mongoHelper.getProductDetails(productId).then(function(mongoProduct){
  if(!mongoProduct) return false;
    return userService.getUserFromEmail(newOwnerEmail).then(function(user){
      return contractHelper.transferOwnership(session,productId,user).then(function(product){
        return addProductDetailsFromDB(mongoProduct,product);
      });
    });
  });
}

exports.addProduct = addProduct;
exports.addProduct = addProduct;
exports.getAll = getAll;
exports.verifyProduct = verifyProduct;
exports.transferOwnership = transferOwnership;
exports.getProduct = getProduct;
