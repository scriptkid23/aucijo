const Aucijo = artifacts.require("../contracts/base/Aucijo.sol");

module.exports = function (deployer) {
  deployer.deploy(Aucijo);
};