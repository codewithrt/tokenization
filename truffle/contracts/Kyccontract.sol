// SPDX-License-Identifier: MIT
pragma solidity ^0.8.14;

import "@openzeppelin/contracts/access/Ownable.sol";
contract Kyccontract is Ownable{

    mapping(address => bool) allowed;
    
    function SetKycCompleted(address _addr) public onlyOwner{
        allowed[_addr] = true;
    }
    function SetKycRevoked(address _addr) public onlyOwner{
        allowed[_addr] = false;
    }
    function KycCompleted(address _addr) public view returns (bool){
        return allowed[_addr];
    }
}