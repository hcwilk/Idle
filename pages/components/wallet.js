import WalletConnectProvider from "@walletconnect/web3-provider";
import { useEffect } from "react";
import Web3 from "web3";
import Web3Modal from "web3modal";
import { ethers } from "ethers";
import CoinbaseWalletSDK from '@coinbase/wallet-sdk';


export const providerOptions = {
	walletconnect: {
	  package: WalletConnectProvider, // required
	  options: {
		infuraId: "d06042096f7a48b9949608c385bc8ba7" // required
	  }
	},
	
  };


export default function Wallet({connect,addr})  {
		return (
			<>
			{addr==""?
			<button className='btn-nav' onClick={connect}>Connect Wallet</button>
			:
			<div className='btn-nav' onClick={connect}>Connected!</div>
			}
			</>
			)

}
