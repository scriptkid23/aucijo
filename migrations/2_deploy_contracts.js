const Aucijo    = artifacts.require("../contracts/base/Aucijo.sol");
const SpiMarket = artifacts.require("../contracts/base/SpiMarket.sol");
module.exports = async function (deployer) {
    await deployer.deploy(SpiMarket);
    await deployer.deploy(Aucijo);
    // const instance = await SpiMarket.deployed();
    // console.log(instance.address);
    // await deployer.deploy(Aucijo,instance.address);
};