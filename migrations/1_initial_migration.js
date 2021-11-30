const Migrations = artifacts.require("Migrations");

module.exports = function (deployer) {
  deployer.deploy(Migrations,{from :"0x448b00525CCd4552a5c9eFbBaAB9304e96500c60"});
};
