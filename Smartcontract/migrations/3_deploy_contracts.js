const Ad = artifacts.require("Ad");

module.exports = function(deployer) {
  deployer.deploy(Ad);
};
