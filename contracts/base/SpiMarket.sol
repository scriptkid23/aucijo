// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "@openzeppelin/contracts/utils/Counters.sol";

contract SpiMarket is ERC721URIStorage{
    using Counters for Counters.Counter;
    Counters.Counter private _tokenIds;
    
    mapping(address => bool) wasSpin;
    mapping(address => uint256[]) client; 
    constructor() ERC721("Spirity Market","SPM"){}
    event AwardRecipient(address indexed recipient, uint256 tokenId);
    // this is a token = content token defined by json from client
    function awardItem(string memory token) public 
    {
        require(!wasSpin[msg.sender],'You was spin');
        _tokenIds.increment();

        uint256 newItemId = _tokenIds.current();
        _mint(msg.sender, newItemId);
        _setTokenURI(newItemId, token);
        wasSpin[msg.sender] = true;
        client[msg.sender].push(newItemId);
        emit AwardRecipient(msg.sender, newItemId);
    }
}