const ethers = require('ethers');
const fs = require('fs');

var logPrefix = "contractHelper: ".red;

var dataContractAddress = "0xeEd4b7A47DFfdb0E9573d4B3071E7ae5607e2D44";
var appContractAddress = "0x60459b91F147FBE1039056Bd0255b867966da030";

var appContractData = require('./appContract.js');

var provider = ethers.getDefaultProvider('ropsten');

var ownerPrivateKey = "0x8ee59a190870a361e482c4ec1db59498532b7f4111ea5501100a0773cceca4c5";
var wallet = new ethers.Wallet(ownerPrivateKey, provider);

var addUser = async function(userAddress,userName,role){

  var contract = new ethers.Contract(appContractAddress, appContractData.getAbi(), provider);
  var contractWithSigner = contract.connect(wallet);
  console.log(logPrefix+"Saving userAddress:"+userAddress+" userName:"+userName+" role:"+role);

  var tx = await contractWithSigner.signupUser(userAddress,userName,role);
  console.log(logPrefix+"Tx:"+tx.hash);
  await tx.wait();
}
exports.addUser = addUser;

var addProduct = async function(userAddress,productId,productName){

  var contract = new ethers.Contract(appContractAddress, appContractData.getAbi(), provider);
  var contractWithSigner = contract.connect(wallet);

  console.log(logPrefix+"userAddress:"+userAddress+" productId:"+productId+" productName:"+productName);

  var tx = await contractWithSigner.addProduct(userAddress,productId,productName);
  console.log(logPrefix+"Tx:"+tx.hash);
  await tx.wait();
}
exports.addProduct = addProduct;

var getProduct = async function(productId){

  var contract = new ethers.Contract(appContractAddress, appContractData.getAbi(), provider);
  console.log(logPrefix+"Getting detials for productId:"+productId);
  var currentValue = await contract.queryProductDetails(productId);
  console.log(logPrefix+"Product:"+currentValue);
  return currentValue;
}
exports.getProduct = getProduct;
