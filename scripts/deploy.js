// We require the Hardhat Runtime Environment explicitly here. This is optional
// but useful for running the script in a standalone fashion through `node <script>`.
//
// When running the script with `npx hardhat run <script>` you'll find the Hardhat
// Runtime Environment's members available in the global scope.
const hre = require("hardhat");

async function main() {

  const Wait = await hre.ethers.getContractFactory("Idle");
  const wait = await Wait.deploy();

  await wait.deployed();

  console.log("Wait deployed to:", wait.address);





}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });

  //npx hardhat run --network PulseChain scripts/deploy.js 


  // npx hardhat run --network rinkeby scripts/deploy.js 
