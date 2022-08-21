import Web3 from 'web3';
import React, {useEffect, useState} from 'react'
import Web3Modal from 'web3modal'
import {Contract, ethers} from 'ethers'
import { IdleAddress } from '../wait_config'
import Head from 'next/head'
import Navbar from '../components/Nav';
import useDarkMode from '../components/useDarkMode'
import { useWeb3React } from '@web3-react/core';
import { getContract } from '../conect/contract';
import Image from 'next/image';




export default function Home() {


	const [loadingState, setLoadingState] = useState('loading');
	const [colorTheme, setColorTheme] = useDarkMode();


	const web3reactContext = useWeb3React(); 
	

		useEffect(()=>  { 		
			console.log("Hitting")
		},[])


	

		return (
		<div className='h-screen bg-yellow-50 flex flex-col justify-between'>
			<Navbar{...{colorTheme, setColorTheme}}></Navbar>
			<div className='flex flex-col justify-center items-center'>
				<h1>Mintable Coin</h1>
				<h1>Rate</h1>
				<Image width={250} height={250} src={'/coin.png'} ></Image> 
			</div>
			<div className="flex justify-center bg-[#5091fa] dark:bg-[#421587]">
			  <div className='flex justify-between items-center max-w-7xl w-full'>
				<div className='flex flex-col w-1/4 justify-center items-center'>
					<h1 className='text-white text-2xl mt-2'>Mulitplier: x256</h1>
					<button className='text-white text-xl bg-[#2277FF] h-20 w-4/5 rounded-2xl mt-8'>Mulitplier: x256</button>
					<button className='text-white text-xl bg-[#2277FF] h-8 w-1/4 rounded-2xl mt-4'>Max</button>
				</div>
				<div className='flex flex-col w-1/4 justify-center items-center'>
					<h1 className='text-white text-2xl mt-2'>Rate: 1/second</h1>
					<button className='text-white text-xl bg-[#2277FF] h-20 w-4/5 rounded-2xl mt-8'>Halve: x1 10 million</button>
					<button className='text-white text-xl bg-[#2277FF] h-8 w-1/4 rounded-2xl mt-4'>Max</button>
				</div>
				<div className='flex flex-col w-1/4 justify-center items-center'>
					<h1 className='text-white text-2xl mt-2'>Base Mult: 10x</h1>
					<button className='text-white text-xl bg-[#2277FF] h-20 w-4/5 rounded-2xl mt-8'>Buy: 1</button>
					<div className="flex justify-between w-5/6">
						<button className='text-white text-xl bg-[#2277FF] h-8 w-1/4 rounded-2xl mt-4'>+5</button>
						<button className='text-white text-xl bg-[#2277FF] h-8 w-1/4 rounded-2xl mt-4'>+25</button>
						<button className='text-white text-xl bg-[#2277FF] h-8 w-1/4 rounded-2xl mt-4'>+100</button>
					</div>
				</div>
				<div className='flex flex-col w-1/4 justify-center items-center'>
					<h1 className='text-white text-2xl mt-2'>Off-Chain Limit: 2 days</h1>
					<button className='text-white text-xl bg-[#2277FF] h-20 w-4/5 rounded-2xl mt-8'>Buy: 1 day</button>
					<div className="flex justify-between w-5/6">
						<button className='text-white text-xl bg-[#2277FF] h-8 w-5/12 rounded-2xl mt-4'>+1 week</button>
						<button className='text-white text-xl bg-[#2277FF] h-8 w-5/12 rounded-2xl mt-4'>+1 month</button>
					</div>
				</div>
			</div>
			</div>
			
		</div>
		)

}
