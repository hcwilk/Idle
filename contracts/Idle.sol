//SPDX-License-Identifier: MIT
pragma solidity ^0.8.2;
import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import "@openzeppelin/contracts/token/ERC20/utils/SafeERC20.sol";
import "@openzeppelin/contracts/token/ERC20/extensions/ERC20Burnable.sol";
import "@openzeppelin/contracts/utils/math/SafeMath.sol";


//Idle game based on cookier clicker, so no business version
//Features include
// - Users can pay for upgrades with "unminted" coin and accrue "debt"
// - Mult doubles and rate halves whenever upgraded
// - Upgrade costs should grow faster than earnings
// - Start at 1 per 60 seconds (1 minute)
// - Pay to double baseMult
// - Reset if you have 1 trillion coin and double the base mult
contract Idle is ERC20, ERC20Burnable, Ownable {

    
    address manager;
    address IdleKing = 0x7162600F53E92c036974b6dEEdb82C2aa876f46d;
    address CONTRACT_ADDRESS = address(this);
    //Number that makes dividing seconds possible
    uint256 constant timeDecimals = 10**16;
    
    constructor() ERC20("Cookie", "COOKIE") {
        manager = msg.sender;
    }

    //Example mappings just to remember how they're made
    mapping (uint => uint) idk;
    mapping (address => mapping(uint => uint)) notsure;
    //Mapping of all the addresses to their user struct
    mapping (address => User) public Users;

    modifier manager_function(){
    require(msg.sender==manager,"Only the manager can call this function");
    _;}

    //True if the player has "joined" the game
    modifier player(){
    require(Users[msg.sender].time > 0,"You should join the game to earn coin");
    _;}

    //True if a user is able to reset their game with a 2x multiplier
    modifier resetable(){
    require(balanceOf(msg.sender) >= 10**(12 * Users[msg.sender].resets),"You don't own enough coin to reset");
    _;}

    //User struct for each address that has joined
    struct User {
        //Multiplier for earnings (starts at 1x)
        uint256 mult;
        //Rate at which user earns coin (starts at per minute), multiplied times 10**16
        uint256 rate;
        //Timestamp the user has been earning since, multiplied times 10**16
        uint256 time;
        //Base multiplier that increases if user pays or resets
        uint256 baseMult;
        //Amount of coin user is due from before User.time
        uint256 pastDue;
        //Amount of coin user has spent without minting, can never be more than mintableCoin()
        uint256 debt;
        //Max off-chain earning, starts at one day (in seconds)
        uint offChain;
        //Number of times a user has reset, reseting gets more expensive each time they do reset
        uint256 resets;
    }

    function decimals() public pure override returns (uint8) {
        return 0;
    }

    //Timestamp multiplied by 10**16 for dividing seconds
    function blockTime() public view returns(uint) {
        return block.timestamp * timeDecimals;
    }

    //Function that allows new user to join game
    // - cannot join if you already have
    // - initilizes each thing in the user struct
    function joinGame() public {
        require(Users[msg.sender].time == 0, "You've already joined the game");
        Users[msg.sender].time = blockTime();
        Users[msg.sender].mult = 1;
        Users[msg.sender].rate = 60 * timeDecimals;
        Users[msg.sender].baseMult = 1;
        Users[msg.sender].pastDue = 0;
        Users[msg.sender].debt = 0;
        Users[msg.sender].offChain = 86400 * timeDecimals;
        Users[msg.sender].resets = 1;

    }

    //How much coin a user is able to mint at the time
    // - ((Current time - time) / rate * mult * baseMult) + pastDue - debt
    function mintableCoin() public view player returns(uint) {
        uint times = (blockTime() - Users[msg.sender].time) / Users[msg.sender].rate;
        if (times > Users[msg.sender].offChain / Users[msg.sender].rate) {
            times = Users[msg.sender].offChain / Users[msg.sender].rate;
        }
        return (times * Users[msg.sender].mult * Users[msg.sender].baseMult) + Users[msg.sender].pastDue - Users[msg.sender].debt;
    }

    //Function that lets user mint their owed coin
    // - Will mint them mintableCoin()
    // - Resets User.time to new time (not just current time because we don't want to 
    //   take away seconds lost during transaction or inbetween User.rate)
    // - Resets pastDue and debt to 0
    // - Off-chain earning is limited based on user's offchain limit
    function mintCoin() public player{
        uint times = (blockTime() - Users[msg.sender].time) / Users[msg.sender].rate;
        require(times + Users[msg.sender].pastDue - Users[msg.sender].debt > 0, "You have not earned any Coin yet");
        Users[msg.sender].time += times * Users[msg.sender].rate;
        if (times > Users[msg.sender].offChain / Users[msg.sender].rate) {
            times = Users[msg.sender].offChain / Users[msg.sender].rate;
        }
        _mint(msg.sender, (times * Users[msg.sender].mult * Users[msg.sender].baseMult) + Users[msg.sender].pastDue - Users[msg.sender].debt);
        Users[msg.sender].pastDue = 0;
        Users[msg.sender].debt = 0;
    }

    //Returns the cost of next multiplier upgrade
    // - needs to grow faster than 2^n
    function upgradeMultCost() public view player returns(uint) {
        //Possible cost that doesn't grow fast enough ((n + 1)^2)
        //return (Users[msg.sender].mult * 2 + 1)**2;
        //This does grow faster than 2^n, I think it is 2^2n but I could be wrong
        return 2**(Users[msg.sender].mult);
    }
    
    //Function that actually upgrade multiplier once
    // - cost is 2^User.mult
    // - Requires that User balance plus mintableCoin() covers the cost
    // - First burns the users coin, and then adds to debt if that doesn't cover it
    //   (This limits totalSupply by burning as much as possible)
    // - Updates pastDue based on last multiplier and time passed
    // - Updates time to new time for new multiplier
    // - Updates multiplier to 2x last one
    function upgradeMult() public player {
        uint cost = 2**(Users[msg.sender].mult);
        require(balanceOf(msg.sender) + mintableCoin() >= cost, "You do not have enough coin to upgrade your multiplier");
        if (balanceOf(msg.sender) >= cost) {
            burn(cost);
        }
        else {
            cost -= balanceOf(msg.sender);
            burn(balanceOf(msg.sender));
            Users[msg.sender].debt += cost;
        }
        
        uint times = (blockTime() - Users[msg.sender].time) / Users[msg.sender].rate;
        Users[msg.sender].time += times * Users[msg.sender].rate;
        if (times > Users[msg.sender].offChain / Users[msg.sender].rate) {
            times = Users[msg.sender].offChain / Users[msg.sender].rate;
        }
        Users[msg.sender].pastDue += times * Users[msg.sender].mult * Users[msg.sender].baseMult;
        Users[msg.sender].mult *= 2;
    }

    function maxUpgradeMult() public view player returns(uint times, uint pastCost) {
        uint mult = Users[msg.sender].mult;
        uint cost = 2**(Users[msg.sender].mult);
        while(balanceOf(msg.sender) + mintableCoin() >= cost + pastCost) {
            pastCost += cost;
            mult *= 2;
            cost = 2**mult;
            times++;

        }
    }
    
    //Function that allows user to maximally upgrade their multiplier
    function upgradeMultMax() public player {
        (uint times,) = maxUpgradeMult();
        while(times > 0) {
            upgradeMult();
            times--;
        }
    }

    //Returns the cost of next rate upgrade
    // - needs to grow faster than 2^n
    // - Requires that User.rate is greater than 2 so they dont end up with a rate of 0 (infinite coin)
    function upgradeRateCost() public view player returns(uint) {
        require(Users[msg.sender].rate > 2, "You have maxed out this upgrade");
        //Possible cost that doesnt grow fast enough ((n + 1)^2)
        //return (7200 * timeDecimals / (Users[msg.sender].rate * 100) + 1)**2;
        //This does grow faster than 2^n, I think it is 2^2n but I could be wrong
        return 2**(60 * timeDecimals / Users[msg.sender].rate);
    }

    //Function that actually upgrade multiplier once
    // - Requires that User.rate is greater than 2 so they dont end up with a rate of 0 (infinite coin)
    // - cost is 2^(36*10**16/User.rate)
    // - Requires that User balance plus mintableCoin() covers the cost
    // - First burns the users coin, and then adds to debt if that doesn't cover it
    //   (This limits totalSupply by burning as much as possible)
    // - Updates pastDue based on last rate and time passed
    // - Updates time to new time for new rate
    // - Updates rate to half of last one
    function upgradeRate() public player {
        require(Users[msg.sender].rate > 2, "You have maxed out this upgrade");
        uint cost = 2**(60 * timeDecimals / Users[msg.sender].rate);
        require(balanceOf(msg.sender) + mintableCoin() >= cost, "You do not have enough coin to upgrade your multiplier");
        if (balanceOf(msg.sender) >= cost) {
            burn(cost);
        }
        else {
            cost -= balanceOf(msg.sender);
            burn(balanceOf(msg.sender));
            Users[msg.sender].debt += cost;
        }
        
        uint times = (blockTime() - Users[msg.sender].time) / Users[msg.sender].rate;
        Users[msg.sender].pastDue += times * Users[msg.sender].mult * Users[msg.sender].baseMult;
        Users[msg.sender].time += times * Users[msg.sender].rate;
        Users[msg.sender].rate /= 2;
    }

    function maxUpgradeRate() public view player returns(uint times, uint pastCost) {
        uint cost = 2**(60 * timeDecimals / Users[msg.sender].rate);
        uint rate = Users[msg.sender].rate;
        while(balanceOf(msg.sender) + mintableCoin() >= cost + pastCost) {
            pastCost += cost;
            if (rate > 2) {
                rate /= 2;
            }
            else {break;}
            cost = 2**(60 * timeDecimals / rate);
            times++;
        }
    }
    
    //Function that allows user to maximally upgrade their rate
    function upgradeRateMax() public player {
        (uint times,) = maxUpgradeRate();
        while(times > 0) {
            upgradeRate();
            times--;
        }
    }

    /*
    !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
    Cole help me understand payable and msg.value
    !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
    //5000000000000000 wei = .005 ether
    */
    
    //Function that allows user to pay .00n ETH and in return add n to User.baseMult
    function payToUpgradeMult() public payable player {
        //I don't think we need this based on how I want to do this upgrade
        //require(msg.value >= 0, "You can't pay to win if you don't pay");
        //I know this math is wrong because we probably need to divide msg.value by like 10**14 or something
        Users[msg.sender].baseMult += msg.value / 10**15;
    }

    //Function that allows user to pay .005 ETH and in return recieves 
    //  coin proportional to their current mult and rate upgrade costs
    function payForProportionalCoin() public payable player {
        //I know the 5 here is wrong but I want it to be >= .005 ETH
        require(msg.value == 5 * 10**15, "You can't pay to win if you don't pay");
        _mint(msg.sender, (upgradeMultCost() + upgradeRateCost()) / 3);
    }

    function increaseOffChain() public payable player {
        Users[msg.sender].offChain += (msg.value / 10**15) * (86400 * timeDecimals);
    }
    
    //Function that allows user with a lot of coin to reset their game with a 2x baseMult
    // - reset cost is equal to 10**(12*User.reset)
    // - starts at 1 trillion, then 10**24, then 10**36
    function reset() public player resetable {
        burn(balanceOf(msg.sender));
        Users[msg.sender].time = blockTime();
        Users[msg.sender].mult = 1;
        Users[msg.sender].rate = 60 * timeDecimals;
        Users[msg.sender].baseMult *= 2;
        Users[msg.sender].pastDue = 0;
        Users[msg.sender].debt = 0;
        Users[msg.sender].resets++;
    }

    function withdrawEth() public {
        payable(IdleKing).transfer(address(this).balance);
    }

    //Things I want to add
    // - limit off-chain earning to something like a day or week
    // - Pay to increase their off-chain earning by a day or week
    // - Optimize contract and math to make this as cheap as possible for users to play
    // - Limitied time deals for new players, 50% to upgrade if mult is below some level

    /*Limited Time events
    
    Features:
    - Earn limited time event coin
    - Coin is actually just state variable stored in the contract (don't actually mint a new coin)
    - Earning coin works similarly to earning Idle Coin (need to work on specifics and upgrades)
    - Starts whenever start function is run and lasts limited time (like a week)
    - Can't run
    */
    
}