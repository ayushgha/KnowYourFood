var Adoption = artifacts.require("./Farm1.sol");

module.exports = function(deployer) {
  // Use deployer to state migration tasks.
  deployer.deploy(Adoption);
};
