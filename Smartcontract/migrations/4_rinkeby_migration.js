var Ad = artifacts.require("Ad");
module.exports = function(deployer, network, accounts) {
 deployer.deploy(Ad,{from: accounts[0]});
};