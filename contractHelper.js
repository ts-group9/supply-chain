const ethers = require('ethers');
var mongoHelper = require('./mongoHelper.js');

var logPrefix = "contractHelper: ".red;
var dataContractAddress = "0xeEd4b7A47DFfdb0E9573d4B3071E7ae5607e2D44";
var appContractAddress = "0x2ed143fc7098d0194c7442d1f94912b885e0c0a7";
var appContractData = require('./appContract.js');
var provider = ethers.getDefaultProvider('ropsten');
var ownerPrivateKey = "0x8695DBFE38DDE3F2C78445E9F2F125324E7CFDEBDB68C0CF9FC1AEBC381332DD";
var wallet = new ethers.Wallet(ownerPrivateKey, provider);

var addUser = async function(userAddress,userName,role){
  var contract = new ethers.Contract(appContractAddress, appContractData.getAbi(), provider);
  var contractWithSigner = contract.connect(wallet);
  console.log(logPrefix+"Saving userAddress:"+userAddress+" userName:"+userName+" role:"+role);
  var tx = await contractWithSigner.signupUser(userAddress,userName,role);
  console.log(logPrefix+"Tx:"+tx.hash);
  await tx.wait();
}

var addProduct = async function(userAddress,productId,productName){
  var contract = new ethers.Contract(appContractAddress, appContractData.getAbi(), provider);
  var contractWithSigner = contract.connect(wallet);
  console.log(logPrefix+"Adding product; userAddress:"+userAddress+" productId:"+productId+" productName:"+productName);
  var tx = await contractWithSigner.addProduct(userAddress,productId,productName);
  console.log(logPrefix+"Tx:"+tx.hash);

  return tx;
}

var getProduct = async function(productId){
  var contract = new ethers.Contract(appContractAddress, appContractData.getAbi(), provider);
  console.log(logPrefix+"Getting detials for productId:"+productId);
  var currentValue = await contract.queryProductDetails(productId);
  console.log(logPrefix+"Product:"+currentValue);
  return currentValue;
}

var getAllProducts = async function(){
  var contract = new ethers.Contract(appContractAddress, appContractData.getAbi(), provider);
  console.log(logPrefix+"Getting all products:");
  var currentValue = await contract.getAllProducts();
  console.log(logPrefix+"Products:"+currentValue);
  return currentValue;
}

var verifyProduct = async function(userAddress,productId){
  var contract = new ethers.Contract(appContractAddress, appContractData.getAbi(), provider);
  var contractWithSigner = contract.connect(wallet);
  console.log(logPrefix+"Verifying productId:"+productId + "with address " + userAddress);
  var currentValue = await contractWithSigner.approveProduct(userAddress,productId);
  console.log(logPrefix+"Product:"+ JSON.stringify(currentValue));
  return getProduct(productId);
}

var transferOwnership = async function(session,productId,user){
  var newOwnerAddress = user.wallet.address;
  var curOwnerAddress = session.accountAddress;
  console.log("newOwnerAddress:"+newOwnerAddress);
  console.log("curOwnerAddress:"+curOwnerAddress);

  var contract = new ethers.Contract(appContractAddress, appContractData.getAbi(), provider);
  var contractWithSigner = contract.connect(wallet);

  console.log(logPrefix+"Transferring productId:"+productId + " from owner " + curOwnerAddress + " to owner " + newOwnerAddress);
  var tx = await contractWithSigner.transferOwnership(curOwnerAddress,productId,newOwnerAddress);

  mongoHelper.logTransferOwnership(session.email,user.email,productId,tx);
  return getProduct(productId);
}

exports.transferOwnership = transferOwnership;
exports.verifyProduct = verifyProduct;
exports.getAllProducts = getAllProducts;
exports.getProduct = getProduct;
exports.addProduct = addProduct;
exports.addUser = addUser;
