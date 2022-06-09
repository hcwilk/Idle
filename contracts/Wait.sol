//SPDX-License-Identifier: Unlicensed
pragma solidity ^0.8.2;
import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/token/ERC20/extensions/ERC20Burnable.sol";
import "@openzeppelin/contracts/security/ReentrancyGuard.sol";




// We should check the rest of OZ imports to see if anything else could be helpful
// We should also read the documentation for the ones we're using to make sure we aren't missing anything
contract Wait is ERC20, ERC20Burnable, ReentrancyGuard {

	address manager;
    
    constructor() ReentrancyGuard() ERC20("Waut", "wait") {
        manager = msg.sender;
    }

   

}