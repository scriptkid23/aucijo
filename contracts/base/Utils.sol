// contracts/MyToken.sol
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;
import "./Schemas.sol";

library ArrayLib {
    
    function exist(Item[] storage self, uint id) internal view returns(bool value){
        for(uint i = 0; i < self.length; i++){
            if(self[i].id == id) return true;
        }
    }
    function find(Item[] storage self, uint id) internal view returns(uint value){
        require(exist(self, id),"Value not found");
        for(uint i=0; i < self.length; i++){
            if(self[i].id == id) return i;
  
        }
    }
    function remove(Item[] storage self, uint id) internal{
        require(self.length > 0);
        uint index = find(self,id);
        Item memory temp = self[index];
        self[index] = self[self.length - 1];
        self[self.length - 1] = temp;
        self.pop();
    }
}