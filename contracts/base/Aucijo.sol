// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;
import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/utils/Counters.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/IERC721Metadata.sol";
import {ArrayLib} from "./Utils.sol";

import "./Schemas.sol";
contract Aucijo is ERC20 {
    address         private StoreToken;
    uint256         private rate;
    IERC721Metadata private SpiMarketAddress;
    address         public  spiMarketAddress;
    constructor(address marketAddress) ERC20("Spirity Token", "SPT") {
        _mint(msg.sender, 0);
        StoreToken  = msg.sender;
        SpiMarketAddress = IERC721Metadata(marketAddress);
        rate        = 1000;
        spiMarketAddress = marketAddress;
    }
    // address deploy smart contract and hold token in auction
    // address private StoreToken = 0x9285640D823eDd78aA24821031aC6499f37825C4;
    
    using Counters for Counters.Counter;
    using ArrayLib for Item[];
    
    Counters.Counter private _auctionId;
    Counters.Counter private _memberId;
    Counters.Counter private _historyTransactionId;
 
    Auction[] auctions;
    mapping(address => Member) members;
    mapping(uint => Item) items;
    mapping(address => bool) registered;
    mapping(uint => bool) itemExist;
    mapping(uint => bool) itemIsAuction;

    modifier mRegistered() {
        require(registered[msg.sender], 'Member was not registered!');
        _;
    }

    event AddItem(address indexed _from, uint _id, string _value);
    event AddAuction(uint id, string name,uint itemId,  string description, uint price, AuctionStatus status, uint start_time, uint end_time);
    event BecomeKing(uint indexed id, address currentKing, uint price, uint becomeAt);
    event CoinCharge(address indexed owner, uint256 value);
    event Withdrawal(address indexed owner, uint256 value);

    function registerMember(string memory firstname, string memory lastname, string memory email, string memory _address, string memory phonenumber) public {
        require(!registered[msg.sender],'Member was registered!');
        Member storage member = members[msg.sender];
        member.firstname = firstname;
        member.lastname = lastname;
        member.email = email;
        member._address = _address;
        member.phonenumber = phonenumber;
        registered[msg.sender] = true;
        _memberId.increment();
    }
    function wasRegistered() public view returns(bool){
        return registered[msg.sender];
    }
    function getProfile() public view mRegistered returns(Member memory){
        return members[msg.sender];
    }
    function addItem(uint256 _tokenId) public mRegistered{
        require(SpiMarketAddress.ownerOf(_tokenId) == msg.sender,"You don't own this item");
        Item storage item = items[_tokenId];
        item.content = SpiMarketAddress.tokenURI(_tokenId);
        item.owner = msg.sender;
        item.id = _tokenId;
        itemExist[_tokenId] = true;
        members[msg.sender].items.push(item);
        emit AddItem(msg.sender, _tokenId, item.content);
    }

    function agree(uint id) public mRegistered{
        require(auctions[id].owner == msg.sender, 'not permission!'); // yêu cầu phải là chủ sở hữu mới được thực thi
        require(auctions[id].start_time <= block.timestamp && auctions[id].end_time >= block.timestamp, 'Outides of auction time');
        require(auctions[id].status == AuctionStatus.START,'Auction was closed');
        require(auctions[id].currentKing != msg.sender,'You are destructive');
        // processing seller: auctions[id].owner
        _transfer(StoreToken, auctions[id].owner, auctions[id].price);
        members[auctions[id].owner].tokens = balanceOf(auctions[id].owner);
        members[auctions[id].owner].items.remove(auctions[id].itemId);
        // proessing purchaser: auctions[id].currentKing
        items[auctions[id].itemId].owner = auctions[id].currentKing;
        members[auctions[id].currentKing].items.push(items[auctions[id].itemId]);
        auctions[id].status = AuctionStatus.CLOSED;
        itemIsAuction[auctions[id].itemId] = false;
        // insert history transaction
        HistoryTransaction memory historyTransactionOfSeller = HistoryTransaction(_historyTransactionId.current(),items[auctions[id].itemId].content,"sold",auctions[id].currentKing,block.timestamp);
        members[auctions[id].owner].historyTransaction.push(historyTransactionOfSeller);
        _historyTransactionId.increment();
        HistoryTransaction memory historyTransactionOfPurcharser = HistoryTransaction(_historyTransactionId.current(),items[auctions[id].itemId].content,"buy",auctions[id].owner,block.timestamp);
        members[auctions[id].currentKing].historyTransaction.push(historyTransactionOfPurcharser);
        _historyTransactionId.increment();
        // processing for SpiMarket
        SpiMarketAddress.approve(auctions[id].currentKing, auctions[id].itemId);
        SpiMarketAddress.transferFrom(auctions[id].owner, auctions[id].currentKing, auctions[id].itemId);
        
    } 
    function revokeAuction(uint id) public mRegistered{
        require(auctions[id].owner == msg.sender, 'not permission!');
        require(auctions[id].start_time <= block.timestamp && auctions[id].end_time >= block.timestamp, 'Outides of auction time');
        require(auctions[id].status == AuctionStatus.START,'Auction was closed');
        if(auctions[id].currentKing != msg.sender){
            _transfer(StoreToken, auctions[id].currentKing, auctions[id].price);
            members[auctions[id].currentKing].tokens = balanceOf(auctions[id].currentKing);
        }
        auctions[id].status = AuctionStatus.CLOSED;
        itemIsAuction[auctions[id].itemId] = false;
    }
    function findItemById(uint id) public view mRegistered returns(Item memory){
        return items[id];
    }
    // function revokeToken trong tường hợp người tạo hợp đồng không agree nhưng đã quá hạn đấu giá, người đấu giá cao nhất có  quyề n 
    // thu hồi token
    function revokeToken(uint id) public mRegistered {
        require(auctions[id].owner != msg.sender,'You is owner');
        require(auctions[id].currentKing == msg.sender,'You not king');
        require(auctions[id].end_time < block.timestamp,'You not permission');
        require(auctions[id].status == AuctionStatus.START,'Auction was closed');
        _transfer(StoreToken, msg.sender, auctions[id].price);
        members[msg.sender].tokens = balanceOf(msg.sender);
        auctions[id].status = AuctionStatus.CLOSED;
    }
    function createAuction(string memory name,uint itemId,  string memory description, uint price, uint start_time, uint end_time) public mRegistered{
        require(keccak256(abi.encodePacked((name))) > 0 && start_time >= block.timestamp && end_time > start_time,'Outside of auction time');
        require(itemExist[itemId],'Item not Exist');
        require(!itemIsAuction[itemId],'Item was auction!');
        itemIsAuction[itemId] = true;
        Auction memory auction = Auction(_auctionId.current(), name, itemId, description, price, start_time, end_time, AuctionStatus.START, msg.sender, msg.sender);
        auctions.push(auction);
        emit AddAuction(_auctionId.current(), name, itemId, description, price, AuctionStatus.START, start_time, end_time);
        _auctionId.increment();
    }
    
    function findAuctionById(uint id) public view mRegistered returns(Auction memory){
        return auctions[id];
    }
    function getAllAuction() public view mRegistered returns(Auction[] memory){
        return auctions;
    }
    // function upgradeStatusAuction(uint id) public mRegistered{
    //     require(auctions[id].owner == msg.sender,'You are not the owner');
    //     auctions[id].status = AuctionStatus.CLOSED ;
    // }
    // đấu giá chỉ được thực hiện khi trong thời gian start và end 
    // khi người dùng đấu giá, sẽ có một StoreToken giữ số tiền người đấu giá để  giữ số tiền người đấu giá
    
    function bid(uint id, uint price) public mRegistered{
        require(auctions[id].status != AuctionStatus.CLOSED,'auction was closed');
        require(auctions[id].start_time <= block.timestamp && auctions[id].end_time >= block.timestamp, 'Outside of auction time');
        require(auctions[id].owner != msg.sender,'You are the owner');
        require(auctions[id].price < price && members[msg.sender].tokens > price, 'You are not enought SPT');
        if(auctions[id].owner != auctions[id].currentKing) {
            _transfer(StoreToken, auctions[id].currentKing, auctions[id].price);
            members[auctions[id].currentKing].tokens = balanceOf(auctions[id].currentKing);
        }
        auctions[id].price = price;
        auctions[id].currentKing = msg.sender;
        transfer(StoreToken, price);
        members[msg.sender].tokens = balanceOf(msg.sender);
        emit BecomeKing(id, msg.sender, price, block.timestamp);
    }
    function getCurrentTime() public view mRegistered returns(uint){
        return block.timestamp;
    }
    function coinCharge() public payable mRegistered{
        (bool sent,) = address(this).call{value: msg.value}("");
        require(sent, "Failed to send Ether");
        _mint(msg.sender, msg.value * rate); // 1 ETH = rate *  SPT
        members[msg.sender].tokens = balanceOf(msg.sender);
        HistoryTransaction memory historyTransactionOfCharge = HistoryTransaction(_historyTransactionId.current(),"SPT","charge",address(this),block.timestamp);
        members[msg.sender].historyTransaction.push(historyTransactionOfCharge);
        emit CoinCharge(msg.sender, members[msg.sender].tokens);
    }
    function withdrawal(uint256 value, uint256 decimal) public payable mRegistered {
        uint256 coin = value * (10 ** (18 - decimal));
        require(members[msg.sender].tokens >= coin,'amount of tokens exceeded');
        (bool sent,) = address(msg.sender).call{value:coin / rate}("");
        require(sent, "Failed to withdrawal Ether");
        members[msg.sender].tokens = members[msg.sender].tokens - coin;
        transfer(StoreToken, coin);
        HistoryTransaction memory historyTransactionOfWithdrawal = HistoryTransaction(_historyTransactionId.current(),"SPT","withdrawal",address(this),block.timestamp);
        members[msg.sender].historyTransaction.push(historyTransactionOfWithdrawal);
        emit Withdrawal(msg.sender, members[msg.sender].tokens);
    }
    receive() external payable {}
    
    
}