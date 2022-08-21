import { useEffect,useState } from "react";
import Web3 from "web3";
import Web3Modal from "web3modal";
import { ethers } from "ethers";
import Wallet from "./wallet";
import { providerOptions } from "./wallet";
import { IdleAddress } from "../wait_config";
import Image from 'next/image'






export default function Navbar({colorTheme, setColorTheme})  {

	useEffect(() => {
		setColorTheme(localStorage.getItem('theme'))
  	},[])


	function toggleColor(){
		let col = localStorage.getItem('theme')
		if(col=='dark'){
			setColorTheme('light')
		}
		else{
			setColorTheme('dark')
		}
	}


	async function addd(){
		
		if(localStorage.getItem("Wallet")=='WC'){
			setTitle("WalletConnect")
			setText("If you're using WalletConnect, the $WAIT Token will automatically be added to your wallet!")
			
			setShowModal(true)
		}

		try {
		  // wasAdded is a boolean. Like any RPC method, an error may be thrown.
		  const wasAdded = await ethereum.request({
			method: 'wallet_watchAsset',
			params: {
			  type: 'ERC20', // Initially only supports ERC20, but eventually more!
			  options: {
				address: IdleAddress, // The address that the token is at.
				symbol: 'WAIT', // A ticker symbol or shorthand, up to 5 chars.
				decimals: 0, // The number of decimals in the token
				image: 'https://0xwait.com/wp-content/uploads/2022/06/WAIT-Logo.png'
			  },
			},
		  });

 
		  const web3Modal = new Web3Modal()
			// init(web3Modal)
	
		  
		
		  if (wasAdded) {
			console.log('Thanks for your interest!');
		  } else {
			console.log('Reload the page!');
		  } 
		} catch (error) {
		  console.log(error);
		}


		
	  }

	 






	
		return (
			<div className="flex justify-center bg-[#5091fa] dark:bg-[#421587]">
				<div className='w-full max-w-7xl md:h-32 h-fit  flex items-center justify-between md:flex-row flex-col bg-[#5091fa] dark:bg-[#421587]'>
					<div className='flex justify-center items-center md:flex-row flex-col md:ml-6'>
						<div className='h-24 w-24 mt-6 md:mt-0 flex justify-center items-center text-4xl font-bold bg-blue-100 rounded-full'>
							ICON
							{/* <img src='Spin.gif'></img> */}
						</div>
						<h1 className=' text-6xl font-semibold mr-12 ml-6 my-6 dark:text-white'>IDLE</h1> 
						<h3 className="mx-6 dark:text-white text-lg"> Game #1</h3>
						<h3 className="mx-6 dark:text-white text-lg"> All Games</h3>
					</div>
					<div className=' flex flex-col md:flex-row gap-6 items-center md:justify-between w-2/5 md:mr-6'>
						<Wallet></Wallet>
						<button onClick={addd} className='btn-nav hover:border-2' ><div className='w-3/5'>Add to MetaMask</div></button>
					
						<div className='mb-6 md:mb-0'>

							<button className="bg-[url('../public/light.png')] dark:bg-[url('../public/dark.png')] bg-no-repeat bg-contain w-16 h-16 md:mt-8" onClick={toggleColor}></button>

						
						
							</div>
					</div>
					
				</div>

			</div>
						)

}





