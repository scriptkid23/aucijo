// contracts/MyToken.sol
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

enum AuctionStatus {PENDING, START, CLOSED}

struct Member {
        uint id;
        string firstname;
        string lastname;
        string email;
        string phonenumber;
        string _address;
        Item[] items;
        HistoryTransaction[] historyTransaction;
    }
struct Item {
        uint id;
        uint tokenId;
        string content;
        address owner;
        address factory;
    }
struct Auction {
        uint id;
        string name;
        uint itemId;
        string description;
        uint price;
        uint start_time;
        uint end_time;
        AuctionStatus status;
        address owner;
        address currentKing;
}
struct HistoryTransaction {
    uint id;
    string itemName;
    string action;
    address dest;
    uint createdAt;
}