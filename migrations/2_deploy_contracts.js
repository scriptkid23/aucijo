const Aucijo = artifacts.require("../contracts/Aucijo.sol");
const Schemas = artifacts.require("../contracts/Schemas.sol");
const Utils = artifacts.require("../contracts/Utils.sol");
module.exports = function (deployer) {
  deployer.deploy(Aucijo);
  deployer.deploy(Schemas);
  deployer.deploy(Utils);
};