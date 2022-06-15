//SPDX-License-Identifier: Unlicensed
pragma solidity ^0.8.2;
import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/token/ERC20/utils/SafeERC20.sol";
import "@openzeppelin/contracts/token/ERC20/extensions/ERC20Burnable.sol";

//236,389 addresses (not excluding non-ethereum wallets)
//.11 to deploy on mainnet
//.005 to deploy on Rinkeby
//.00011 to add one address on Rinkeby
//.00017 to add two addresses on Rinkeby
//.05225 to add 870 addresses on Rinkeby (estimated)
//14.18339 to add 236,389 addresses on Rinkeby (estimated)
//283.6678 to add 236,389 addresses on mainnet (estimated)

//Mint unclaimed Wait to us when minting is turned off
//50% to us and 50% to users who did claim
//Midnight bonus

contract Wait is ERC20, ERC20Burnable, Ownable {

    address manager;
    uint256 public totalPeople = 3;
    uint256 public mintedPeople;
    uint256 public unclaimedWait;
    bool public minting = true;
    mapping (address => bool) public addList;
    mapping (address => bool) public phiatInData;
    mapping (address => bool) public phiatIsClaimable;
    
    constructor() ERC20("Wait", "WAIT") {
        manager = msg.sender;
        addList[msg.sender] = true;
    }

    modifier manager_function(){
    require(msg.sender==manager,"Only the manager can call this function");
    _;}

    modifier minting_on(){
    require(minting == true,"Wait cannot be minted anymore");
    _;}

    // DEV FUNCTIONS

    //number of decimals for TIDE, same as HEX
    function decimals() public pure override returns (uint8) {
        return 8;
    }

    function checkDatabase() public minting_on {
        if (addList[msg.sender]){
            phiatInData[msg.sender] = true;
        }
    }

    function mintablePhiatWait() public view minting_on returns(uint){

        require(phiatInData[msg.sender] == true, "You were not in the sacrifice or you need to check!");
        require(phiatIsClaimable[msg.sender] == false, "You already minted your wait!");
        
        uint currentTime = block.timestamp;
        uint mintableWait = (currentTime - 1654578000) / 3600;

        return mintableWait;

    }
    
    function mintPhiatWait() public minting_on {

        require(phiatIsClaimable[msg.sender] == false, "You already minted your wait from the Phiat sacrifice!");
        require(phiatInData[msg.sender] == true, "You were not in the Phiat sacrifice or you haven't checked the database yet!");

        phiatIsClaimable[msg.sender] = true;
        mintedPeople++;

        uint currentTime = block.timestamp;
        uint mintableWait = (currentTime - 1654578000) / 3600;
        _mint(msg.sender, mintableWait);

    }

    function mintOff() public manager_function minting_on{
        minting = false;
        unclaimedWait = (totalPeople - mintedPeople) * ((block.timestamp - 1654578000) / 3600) / 2;
        _mint(address(0xeC8d1d1E1bfDB23403B7d5816BE0D43A21Db8C6E), unclaimedWait);
    }

    function mintUnclaimedWait() public {

        require(!minting, "Minting is still on");
        require(phiatIsClaimable[msg.sender], "You never claimed your wait or already claimed the unclaimed wait");

        phiatIsClaimable[msg.sender] = false;
        uint waitAmount = unclaimedWait/mintedPeople;

        _mint(msg.sender, waitAmount);
        
    }

    function returnCurrentTime() public view returns(uint) {
        return block.timestamp;
    }

    function userBalance() public view returns(uint) {
        return balanceOf(msg.sender);
    }

}