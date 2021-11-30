const Aucijo    = artifacts.require("../contracts/base/Aucijo.sol");
const SpiMarket = artifacts.require("../contracts/base/SpiMarket.sol");
module.exports = async function (deployer) {
    await deployer.deploy(SpiMarket,{from: "0x448b00525CCd4552a5c9eFbBaAB9304e96500c60"});
    await deployer.deploy(Aucijo,{from: "0x448b00525CCd4552a5c9eFbBaAB9304e96500c60"});
    // const instance = await SpiMarket.deployed();
    // console.log(instance.address);
    // await deployer.deploy(Aucijo,instance.address);
};