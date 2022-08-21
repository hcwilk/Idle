require("@nomiclabs/hardhat-waffle");
require("@nomiclabs/hardhat-etherscan")
require('dotenv').config({ path: __dirname + '/.env.local' })
// const fs = require("fs")
// const privateKey = fs.readFileSync(".secret").toString()
// This is a sample Hardhat task. To learn how to create your own go to
// https://hardhat.org/guides/create-task.html
// task("accounts", "Prints the list of accounts", async (taskArgs, hre) => {
//   const accounts = await hre.ethers.getSigners();

//   for (const account of accounts) {
//     console.log(account.address);
//   }
// });

// You need to export an object to set up your config
// Go to https://hardhat.org/config/ to learn more

/**
 * @type import('hardhat/config').HardhatUserConfig
 */

module.exports = {
  networks: {
    hardhat:{
      chainId:  1337
    },
    PulseChain:{
      url: `https://rpc.v2b.testnet.pulsechain.com`,
      accounts: [process.env.PRIV_KEY]
    },
	rinkeby:{
		url: process.env.RINK,
		accounts: [process.env.PRIV_KEY]
	}
  },
  solidity: "0.8.2",
  etherscan: {
	apiKey: "VWUS3IZWEWXR3F1RHU6D4I11TAXMWFZPGA"
  }
};
