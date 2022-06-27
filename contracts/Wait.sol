//SPDX-License-Identifier: MIT
pragma solidity ^0.8.2;
import '@chainlink/contracts/src/v0.8/ChainlinkClient.sol';
import '@chainlink/contracts/src/v0.8/ConfirmedOwner.sol';
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

contract Wait is ERC20, ERC20Burnable,  ChainlinkClient, ConfirmedOwner {
    using Chainlink for Chainlink.Request;

    address manager;
    uint256 public totalSacs = 2;
    bool public minting = true;
    uint public checkDB=0;
    uint public fulf=0;

    string public yes1;
    bytes32 private jobId;
    mapping(uint => address) public addy_bridge;
    mapping(uint => uint) public sac_bridge;
    mapping (uint => mapping(address => bool)) public InData;
    mapping (uint => mapping(address => bool)) public Claimed;
    mapping (uint => mapping(address => uint)) public ClaimedAmount;
    mapping(uint => uint) public totalWait;
    mapping(uint => uint) public totalPeople;
    mapping(uint => uint) public mintedPeople;
    mapping(uint => uint) public unclaimedWait;
    mapping(uint => uint) public sacTimes;
    
    constructor() ERC20("Wait", "WAIT") ConfirmedOwner(msg.sender){
        manager = msg.sender;
        totalPeople[0] = 45110; //Pulse
        totalPeople[1] = 93920; //PulseX
        totalPeople[2] = 5720; //Liquid Loans
        totalPeople[3] = 1212; //Mintra
        totalPeople[4] = 644; //Genius
        totalPeople[5] = 145; //Hurricash
        totalPeople[6] = 649; //Phiat
        totalPeople[7] = 860; //Internet Money Dividend

        sacTimes[0] = 1654578000;
        sacTimes[1] = 1654578000;

        setChainlinkToken(0x01BE23585060835E02B77ef475b0Cc51aA1e0709);
        setChainlinkOracle(0x28E27a26a6Dd07a21c3aEfE6785A1420b789b53C);
        jobId = '30146dbaf8424887bf978fe3057b5352';
    }

    modifier manager_function(){
    require(msg.sender==manager,"Only the manager can call this function");
    _;}

    modifier minting_on(){
    require(minting == true,"Minting Wait has been turned off, go claim the unclaimed Wait");
    _;}

    function decimals() public pure override returns (uint8) {
        return 8;
    }

    function checkDatabase(string memory _address, uint _index) public returns (bytes32 requestId) {

        require(!InData[_index][msg.sender],"You're already in the database");
        
        Chainlink.Request memory req = buildChainlinkRequest(jobId, address(this), this.fulfill.selector);
        
        
        addy_bridge[checkDB] = msg.sender;
        sac_bridge[checkDB] = _index;

        checkDB++;

        // TODO: Add the identifier for which sac

        req.add('address', _address); // Chainlink nodes 1.0.0 and later support this format


        // Sends the request, '0' just means it costs 0 link
        sendOperatorRequest(req, 0);
    }

    function fulfill(bytes32 _requestId, bool _inData) public recordChainlinkFulfillment(_requestId) {

        InData[sac_bridge[fulf]][addy_bridge[fulf]]=_inData;
        fulf++;
    }

    function mintableWait(uint sac) public view minting_on returns(uint){

        require(sac < totalSacs, "Not an accurate sacrifice");
        require(InData[sac][msg.sender] == true, "You were not in the specific sacrifice or you need to check!");
        require(Claimed[sac][msg.sender] == false, "You already minted your wait for this sacrifice!");
        
        return (block.timestamp - sacTimes[sac]) / 3600;

    }
    
    function mintWait(uint sac) public minting_on {

        require(sac < totalSacs, "Not an accurate sacrifice");
        require(Claimed[sac][msg.sender] == false, "You already minted your wait for this sacrifice!");
        require(InData[sac][msg.sender] == true, "You were not in this sacrifice or you haven't checked the database yet!");

        Claimed[sac][msg.sender] = true;
        mintedPeople[sac]++;

        uint mintableWait1 = (block.timestamp - sacTimes[sac]) / 3600;
        ClaimedAmount[sac][msg.sender] = mintableWait1;
        totalWait[sac] += mintableWait1;
        _mint(msg.sender, mintableWait1);

    }

    function mintableAllWait() public view minting_on returns (uint mintableWait1) {

        for(uint i; i < totalSacs; i++) {
            if(!Claimed[i][msg.sender] && InData[i][msg.sender]) {
                mintableWait1 += (block.timestamp - sacTimes[i]) / 3600;
            }
        }

    }
    
    function mintAllWait() public minting_on {

        uint mintableWait1 = 0;

        for(uint i; i < totalSacs; i++) {
            if(!Claimed[i][msg.sender] && InData[i][msg.sender]) {
                Claimed[i][msg.sender] = true;
                mintedPeople[i]++;
                ClaimedAmount[i][msg.sender] = (block.timestamp - sacTimes[i]) / 3600;
                totalWait[i] += ClaimedAmount[i][msg.sender];
                mintableWait1 += ClaimedAmount[i][msg.sender];
            }
        }

        _mint(msg.sender, mintableWait1);
        
    }

    function mintOff() public manager_function minting_on {

        minting = false;
        uint waitAmount;

        for(uint i; i < totalSacs; i++) {
            unclaimedWait[i] = (totalPeople[i] - mintedPeople[i]) * ((block.timestamp - sacTimes[i]) / 3600) / 2;
            waitAmount += unclaimedWait[i];
        }

        _mint(address(0xeC8d1d1E1bfDB23403B7d5816BE0D43A21Db8C6E), waitAmount);
    }

    function mintableUnclaimedWait(uint sac) public view returns (uint waitAmount) {

        require(!minting, "Minting is still on");
        require(Claimed[sac][msg.sender], "You never claimed your wait or already claimed the unclaimed wait");

        waitAmount = unclaimedWait[sac] * ClaimedAmount[sac][msg.sender] / totalWait[sac];

    }
    
    function mintUnclaimedWait(uint sac) public {

        require(!minting, "Minting is still on");
        require(Claimed[sac][msg.sender], "You never claimed your wait or already claimed the unclaimed wait");

        Claimed[sac][msg.sender] = false;
        uint waitAmount;
        waitAmount = unclaimedWait[sac] * ClaimedAmount[sac][msg.sender] / totalWait[sac];
        _mint(msg.sender, waitAmount);
        
    }

    function mintableAllUnclaimedWait() public view returns(uint waitAmount) {

        require(!minting, "Minting is still on");

        for(uint i; i < totalSacs; i++) {
            if(Claimed[i][msg.sender]) {
                waitAmount += unclaimedWait[i] * ClaimedAmount[i][msg.sender] / totalWait[i];
            }
        }

    }
    
    function mintAllUnclaimedWait() public {

        require(!minting, "Minting is still on");

        uint waitAmount = 0;
        for(uint i; i < totalSacs; i++) {
            
            if(Claimed[i][msg.sender]) {
                Claimed[i][msg.sender] = false;
                waitAmount += unclaimedWait[i] * ClaimedAmount[i][msg.sender] / totalWait[i];
            }
        }

        _mint(msg.sender, waitAmount);
    }

    function returnCurrentTime() public view returns(uint) {
        return block.timestamp;
    }

    function userBalance() public view returns(uint) {
        return balanceOf(msg.sender);
    }

}