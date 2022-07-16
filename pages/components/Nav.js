import { useEffect,useState } from "react";
import Web3 from "web3";
import Web3Modal from "web3modal";
import { ethers } from "ethers";
import Wallet from "./wallet";
import { providerOptions } from "./wallet";
import { WaitAddress } from "../../wait_config";
import Image from 'next/image'






export default function Navbar({init, colorTheme, setColorTheme, addr})  {

	

	async function connect(){ 
		const web3Modal =  await new Web3Modal({
			cacheProvider: false, // optional
			providerOptions // required
		  });

		  init(web3Modal)
		  console.log('???')
	}


	async function addd(){
		console.log(
			'holy shit'
		)

		try {
		  // wasAdded is a boolean. Like any RPC method, an error may be thrown.
		  const wasAdded = await ethereum.request({
			method: 'wallet_watchAsset',
			params: {
			  type: 'ERC20', // Initially only supports ERC20, but eventually more!
			  options: {
				address: WaitAddress, // The address that the token is at.
				symbol: 'WAIT', // A ticker symbol or shorthand, up to 5 chars.
				decimals: 0, // The number of decimals in the token
				image: 'https://0xwait.com/wp-content/uploads/2022/06/WAIT-Logo.png'
			  },
			},
		  });

		  console.log("hwa tthe fuck")

		  const web3Modal = new Web3Modal()
			init(web3Modal)
	
		  
		
		  if (wasAdded) {
			console.log('Thanks for your interest!');
		  } else {
			console.log('Reload the page!');
		  }
		} catch (error) {
		  console.log(error);
		  console.log("hsit")
		}


		
	  }






	
		return (
			<div className="flex justify-center dark:bg-[#252E3F]">
								<div className='w-full max-w-7xl md:h-32 h-fit  flex items-center justify-between md:flex-row flex-col dark:bg-[#252E3F]'>
					<div className='flex justify-center items-center md:flex-row flex-col md:ml-6'>
						<div className='h-24 w-24 mt-6 md:mt-0'>
							<img src='WAIT.png'></img>
							{/* <img src='Spin.gif'></img> */}
						</div>
						<h1 className=' text-6xl font-semibold mr-12 ml-6 my-6 dark:text-white'>$WAIT</h1> 
					</div>
					<div className=' flex flex-col md:flex-row gap-6 items-center md:justify-between w-1/2 md:mr-6'>
						<Wallet {...{connect, addr}}></Wallet>
						<button onClick={addd} className='btn-nav' ><div className='w-3/5'>Add to MetaMask</div> <img src='WAIT.png' className='w-12 h-12'></img></button>
					
						<div className='mb-6 md:mb-0'>

						
						{colorTheme === "dark" ? (
							<img
								onClick={() => setColorTheme("dark")}
								src="light.png"
								height={30}
								width={60}
							>
								
							</img>
							) : (
								<img
								onClick={() => setColorTheme("light")}
								src="dark.png"
								height={30}
								width={60}
							>
								
							</img>
							)}
							</div>
					</div>
					
				</div>

			</div>
						)

}





