// SPDX-License-Identifier: MIT
pragma solidity ^0.8.14;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";

contract MYGLDToken is ERC20 {
    constructor(uint256 initialSupply) ERC20("My Bitcoin Gold token", "GLD") {
        _mint(msg.sender, initialSupply);
    }
}
// for creating the tokens only