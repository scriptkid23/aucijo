import {
  SpiMarket,
  AwardRecipientEvent,
} from "./../frontend/src/hardhat/typechain/SpiMarket";
import { Aucijo } from "./../frontend/src/hardhat/typechain/Aucijo";
import { expect } from "./chai-setup";
import { ethers } from "hardhat";
import { SignerWithAddress } from "hardhat-deploy-ethers/signers";
import moment from "moment";

describe("Aucijo Contract", function () {
  let AucijoContract: Aucijo;
  let SpimarketContract: SpiMarket;
  let owner: SignerWithAddress;
  let bidder1: SignerWithAddress;
  let bidder2: SignerWithAddress;
  let bidder3: SignerWithAddress;
  context("CoinCharge and withdrawal", function () {
    this.beforeEach(async function () {
      let signers = await ethers.getSigners();
      owner = signers[0];
      this._aucijoContract = await ethers.getContractFactory("Aucijo");
      AucijoContract = await this._aucijoContract.deploy();
    });
    it("deposit with 1 ETH when not registered!", async function () {
      await expect(
        AucijoContract.connect(owner).coinCharge({
          value: ethers.utils.parseEther("1"),
        })
      ).to.be.reverted;
    });
    it("deposit with 1 ETH when was registered!", async function () {
      await AucijoContract.connect(owner).registerMember(
        "Hello",
        "What",
        "dev@icetea.io",
        "Hanoi",
        "0995164536"
      );
      AucijoContract.connect(owner).coinCharge({
        value: ethers.utils.parseEther("1"),
      });
      let balance = await AucijoContract.balanceOf(owner.address);
      expect(balance).to.be.eq(ethers.utils.parseEther("1000"));
    });
    it("deposit with 0.34513 ETH when was registered!", async function () {
      await AucijoContract.connect(owner).registerMember(
        "Hello",
        "What",
        "dev@icetea.io",
        "Hanoi",
        "0995164536"
      );
      AucijoContract.connect(owner).coinCharge({
        value: ethers.utils.parseEther("0.34513"),
      });
      let balance = await AucijoContract.balanceOf(owner.address);
      expect(balance).to.be.eq(ethers.utils.parseEther("345.13"));
    });
    it("deposit with 1 ETH and withdrawal 30.5 SPT", async function () {
      await AucijoContract.connect(owner).registerMember(
        "Hello",
        "What",
        "dev@icetea.io",
        "Hanoi",
        "0995164536"
      );
      AucijoContract.connect(owner).coinCharge({
        value: ethers.utils.parseEther("1"),
      });
      let beforeBalance = await AucijoContract.balanceOf(owner.address); // balance = 1000 SPT
      await AucijoContract.connect(owner).withdrawal(
        ethers.utils.parseEther("30.5")
      );
      let AfterBalance = await AucijoContract.balanceOf(owner.address); // balance = 1000 - 30.5 = 969.5 SPT
      expect(AfterBalance).to.be.eq(ethers.utils.parseEther("969.5"));
    });
    it("deposit with 1 ETH and withdrawal 30.5 SPT", async function () {
      await AucijoContract.connect(owner).registerMember(
        "Hello",
        "What",
        "dev@icetea.io",
        "Hanoi",
        "0995164536"
      );
      AucijoContract.connect(owner).coinCharge({
        value: ethers.utils.parseEther("1"),
      });
      let beforeBalance = await AucijoContract.balanceOf(owner.address); // balance = 1000 SPT
      await AucijoContract.connect(owner).withdrawal(
        ethers.utils.parseEther("30.5")
      );
      let AfterBalance = await AucijoContract.balanceOf(owner.address); // balance = 1000 - 30.5 = 969.5 SPT
      expect(AfterBalance).to.be.eq(ethers.utils.parseEther("969.5"));
    });
    it("deposit with 1 ETH and withdrawal 1000 SPT", async function () {
      await AucijoContract.connect(owner).registerMember(
        "Hello",
        "What",
        "dev@icetea.io",
        "Hanoi",
        "0995164536"
      );
      AucijoContract.connect(owner).coinCharge({
        value: ethers.utils.parseEther("1"),
      });
      let beforeBalance = await AucijoContract.balanceOf(owner.address); // balance = 1000 SPT
      await AucijoContract.connect(owner).withdrawal(
        ethers.utils.parseEther("1000")
      );
      let AfterBalance = await AucijoContract.balanceOf(owner.address); // balance = 1000 - 30.5 = 969.5 SPT
      expect(AfterBalance).to.be.eq(ethers.utils.parseEther("0"));
    });
  });
  context("Spin", function () {
    this.beforeEach(async function () {
      let signers = await ethers.getSigners();
      owner = signers[0];
      this._aucijoContract = await ethers.getContractFactory("Aucijo");
      this._spimarketContract = await ethers.getContractFactory("SpiMarket");
      AucijoContract = await this._aucijoContract.deploy();
      SpimarketContract = await this._spimarketContract.deploy();
    });
    it("Test spin", async function () {
      await SpimarketContract.connect(owner).awardItem("123");
    });
    it("Test spin with dupplicate", async function () {
      await SpimarketContract.connect(owner).awardItem("123");
      try {
        await SpimarketContract.connect(owner).awardItem("123");
      } catch (error) {
        await expect(error);
      }
    });
  });
  context("Auction", function () {
    this.beforeEach(async function () {
      let signers = await ethers.getSigners();
      owner = signers[0];
      bidder1 = signers[1];
      bidder2 = signers[2];
      bidder3 = signers[3];
      this._aucijoContract = await ethers.getContractFactory("Aucijo");
      this._spimarketContract = await ethers.getContractFactory("SpiMarket");
      AucijoContract = await this._aucijoContract.deploy();
      SpimarketContract = await this._spimarketContract.deploy();
      await AucijoContract.connect(owner).registerMember(
        "Hello",
        "What",
        "dev@icetea.io",
        "Hanoi",
        "0995164536"
      );
      await AucijoContract.connect(bidder1).registerMember(
        "Hello",
        "What",
        "dev@icetea.io",
        "Hanoi",
        "0995164536"
      );
      await AucijoContract.connect(bidder2).registerMember(
        "Hello",
        "What",
        "dev@icetea.io",
        "Hanoi",
        "0995164536"
      );
      await AucijoContract.connect(bidder3).registerMember(
        "Hello",
        "What",
        "dev@icetea.io",
        "Hanoi",
        "0995164536"
      );
    });
    it("Create auction", async function () {
      // award NFT
      let tx = await SpimarketContract.connect(owner).awardItem("NFT 1");
      let txr = await tx.wait();
      let args = txr.events?.find((e) => e.event === "AwardRecipient")?.args;
      expect(args?.tokenId).to.eq(ethers.BigNumber.from("1"));

      let txAddItem = await AucijoContract.connect(owner).addItem(
        args?.tokenId,
        SpimarketContract.address
      );
      let txrAddItem = await txAddItem.wait();
      let argsAddItem = txrAddItem.events?.find(
        (e) => e.event === "AddItem"
      )?.args;
      expect(argsAddItem?._from).to.eq(owner.address);

      const minutesToAdd = 3;
      const startTime = new Date(new Date().getTime() + minutesToAdd * 60000);
      const endTime = new Date(2022, 2, 9);
      // list item on Aucijo
      let txAddAuction = await AucijoContract.connect(owner).createAuction(
        "NFT 1",
        argsAddItem?._id,
        "Game NFT",
        ethers.utils.parseEther("30"),
        moment(startTime).unix(),
        moment(endTime).unix()
      );
      let txrAddAuction = await txAddAuction.wait();
      let argsAddAuction = txrAddAuction.events?.find(
        (e) => e.event === "AddAuction"
      )?.args;
      expect(argsAddAuction?.id).to.eq(0);
    });

    it("Check Bid flow", async function () {
      let tx = await SpimarketContract.connect(owner).awardItem("NFT 1");
      let txr = await tx.wait();
      let args = txr.events?.find((e) => e.event === "AwardRecipient")?.args;
      expect(args?.tokenId).to.eq(ethers.BigNumber.from("1"));

      let txAddItem = await AucijoContract.connect(owner).addItem(
        args?.tokenId,
        SpimarketContract.address
      );
      let txrAddItem = await txAddItem.wait();
      let argsAddItem = txrAddItem.events?.find(
        (e) => e.event === "AddItem"
      )?.args;
      expect(argsAddItem?._from).to.eq(owner.address);
      const endTime = new Date(2022, 2, 10);
      // list item on Aucijo
      await AucijoContract.connect(owner).createAuction(
        "NFT 1",
        argsAddItem?._id,
        "Game NFT",
        ethers.utils.parseEther("100"),
        moment().unix(),
        moment(endTime).unix()
      );
      await SpimarketContract.connect(owner)["safeTransferFrom(address,address,uint256)"](owner.address, AucijoContract.address, 1);
      try{
        await AucijoContract.connect(bidder1).bid(0, ethers.utils.parseEther('300'))
      }
      catch(error){
        expect(error)
      }
      await AucijoContract.connect(bidder1).coinCharge({value: ethers.utils.parseEther('1')});
      await AucijoContract.connect(bidder1).bid(0, ethers.utils.parseEther('300'))
      try{
        await AucijoContract.connect(bidder1).bid(0, ethers.utils.parseEther('300'))
      }
      catch(error){
        expect(error)
      }
      await AucijoContract.connect(bidder1).bid(0, ethers.utils.parseEther('400'))
      
      await AucijoContract.connect(bidder2).coinCharge({value: ethers.utils.parseEther('1')})
      await AucijoContract.connect(bidder2).bid(0, ethers.utils.parseEther('441'))
      await AucijoContract.connect(bidder3).coinCharge({value: ethers.utils.parseEther('1')})
      try{
        await AucijoContract.connect(bidder3).bid(0, ethers.utils.parseEther('300'))
      }catch(error){
        expect(error)
      }
      await AucijoContract.connect(bidder3).bid(0, ethers.utils.parseEther('800'))
      let balance = await AucijoContract.balanceOf(bidder2.address);
      // check refund
      expect(balance).to.be.eq(ethers.utils.parseEther('1000'));
      let balanceOfBidder3 = await AucijoContract.balanceOf(bidder3.address);
      expect(balanceOfBidder3).to.be.eq(ethers.utils.parseEther('200'))

      await AucijoContract.connect(owner).agree(0);
      let balanceOfOwner = await AucijoContract.balanceOf(owner.address);
      expect(balanceOfOwner).to.be.eq(ethers.utils.parseEther('800'))

      let newOwner = await SpimarketContract.ownerOf(1);
      expect(newOwner).to.be.eq(bidder3.address);
    });
    
  });
});
