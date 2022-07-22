import Web3 from 'web3';
import React, {useEffect, useState} from 'react'
import Web3Modal from 'web3modal'
import {Contract, ethers} from 'ethers'
import Wait from '../artifacts/contracts/Wait.sol/Wait.json' 
import { WaitAddress } from '../wait_config'
import Head from 'next/head'
import Modal from './components/Modal';
import Progress from './components/Progres';
import axios from 'axios';
import Navbar from './components/Nav';
import Footer from './components/Footer';
import InfoBar from './components/Info';
import useDarkMode from "./components/useDarkMode";
import Demo from './components/demo';
import { useWeb3React } from '@web3-react/core';
import { getContract } from '../conect/contract';




export default function Home() {


	const [loadingState, setLoadingState] = useState('loading');

	const [sacs,setSacs] = useState([])
	const [first,setFirst] = useState([])
	const [end,setEnd] = useState([])
	const [total, setTotal] = useState(0) 
	const [checked, setChecked] = useState(false) 
	const [addr, setAddr] = useState("")
	const [showModal, setShowModal] = useState(false);
	const [which, setWhich] = useState(1)
	const [colorTheme, setColorTheme] = useDarkMode();
	const [id, setId] = useState("213");
	const [text, setText] = useState("Checking eligibility can take up to 30 seconds. The page should refresh on it's own. If it gets stuck, try refreshing manually");
	const [title, setTitle] = useState("Hang tight! We're checking the database for your address!");
	const [eli, setEli] = useState("Connect Wallet Above!");

	const web3reactContext = useWeb3React(); 
	

	  useEffect(()=>  { 		
		// setShowModal(true)
		baseInit()
		  if(window.ethereum){
			window.ethereum.on('accountsChanged', function (accounts) {
				reload()
			}) 
				baseInit()
		  }
		  else{
			baseInit()
		  }
	  },[])


	  async function baseInit(){
		const yes = [{ 
							id:0,
							name: "Pulse",
							image: "pulse.png",
							time:1627948800,
							inD: 0,
							C: 0,
							cla:0
				
						},
						{
							id:1,
							name: "PulseX",
							image: "pulsex.png",
							time:1645660800,
							inD: 0,
							C: 0,
							cla:0
						},
						{
							id:2,
							name: "Liquid Loans",
							image: "liquidloans.png",
							time:1647907200,
							inD: 0,
							C: 0,
							cla:0
						},
						{
							id:3,
							name: "Hurricash",
							image: "hurricash.png",
							time:1646092800,
							inD: 0,
							C: 0,
							cla:0
						},
						{
							id:4,
							name: "Genius",
							image: "genius.png",
							time:1654041600,
							inD: 0,
							C: 0,
							cla:0
						},
						{
							id:5,
							name: "Mintra",
							image: "mintra.png",
							time: 1646179200,
							inD: 0,
							C: 0,
							cla:0
						},
						{
							id:6,
							name: "Phiat",
							image: "phiat.png",
							time:1654387200,
							inD: 0,
							C: 0,
							cla:0
						},
						{
							id:7,
							name: "I.M.D",
							image: "imd.png",
							time:1647734400,
							inD: 0,
							C: 0,
							cla:0
						}]	
						setSacs(yes)
					  }
	  
	async function init(){
		try{ 
			setEli("CHECK ELIGIBILITY")
			const WaitContract = await getContract(web3reactContext.library, web3reactContext.account);
			const overrides = {
				gasLimit: 230000
			};

			// console.log(web3reactContext.account)
			// console.log(web3reactContext.account.toLowerCase())
			// console.log("0xa75E3613F23C76BE1e5a314e70C9859313711e45".toLowerCase())



			const data1 = await WaitContract.inDatabase();

			const claim1 = await WaitContract.haveClaimed();

			const jflkdfsdfa = await WaitContract.hasChecked();

			const arrayClaimable = await WaitContract.mintableAllWait();	

			if(data1.includes(true)){
				setChecked(true)
			}
			else{
				setChecked(jflkdfsdfa)
			}

			
	
			const yes = [{
				id:0,
				name: "Pulse",
				image: "pulse.png",
				time:1627948800,
				inD: data1[0],
				C: claim1[0],
				cla: parseInt(arrayClaimable[0]._hex)
	
			},
			{
				id:1,
				name: "PulseX",
				image: "pulsex.png",
				time:1645660800,
				inD: data1[1],
				C: claim1[1],
				cla: parseInt(arrayClaimable[1]._hex)
			},
			{
				id:2,
				name: "Liquid Loans",
				image: "liquidloans.png",
				time:1647907200,
				inD: data1[2],
				C: claim1[2],
				cla: parseInt(arrayClaimable[2]._hex)
			},
			{
				id:3,
				name: "Hurricash",
				image: "hurricash.png",
				time:1646092800,
				inD: data1[3],
				C: claim1[3],
				cla: parseInt(arrayClaimable[3]._hex)
			},
			{
				id:4,
				name: "Genius",
				image: "genius.png",
				time:1654041600,
				inD: data1[4],
				C: claim1[4],
				cla: parseInt(arrayClaimable[4]._hex)
			},
			{
				id:5,
				name: "Mintra",
				image: "mintra.png",
				time: 1646179200,
				inD: data1[5],
				C: claim1[5],
				cla: parseInt(arrayClaimable[5]._hex)
			},
			{
				id:6,
				name: "Phiat",
				image: "phiat.png",
				time:1654387200,
				inD: data1[6],
				C: claim1[6],
				cla: parseInt(arrayClaimable[6]._hex)
			},
			{
				id:7,
				name: "I.M.D",
				image: "imd.png",
				time:1647734400,
				inD: data1[7],
				C: claim1[7],
				cla: parseInt(arrayClaimable[7]._hex)
			}]
			
			
			setSacs(yes)

		
			
			
			setFirst(yes.slice(0,4))
			setEnd(yes.slice(4,8))
			
			const sum = yes.filter(({C}) => C ===false).reduce((partialSum, a) => partialSum + a.cla, 0);
			setTotal(sum)
			


			if(jflkdfsdfa && sum>0){
				if(localStorage.getItem(web3reactContext.account.toLowerCase()) || localStorage.getItem("Wallet")=='WC'){
					setWhich(3)
				}
				else{setWhich(2)}
			}
			else{
				setWhich(1)
			}
			setLoadingState("loaded")
		}
		catch(error){
			console.log(error)
		}
	}

	function reload(){
		window.location.reload(false);
	  }

	  async function mintSpecific(sac) {
		if(localStorage.getItem("Wallet")=="MetaMask"){

			setTitle("Hang Tight! Metamask is confirming your transaction")
			setText("You should see your $WAIT in your wallet in just a moment!")
		}
		else{
			setTitle("Confirm your transaction through your WalletConnect Provider")
			setText("Once everyone signs and approves of the transaction, wait until the transaction is confirmed and then refresh your page!")

		}


		const myContract = getContract(web3reactContext.library, web3reactContext.account);
			
	
		init()

		try{
			let transaction = await myContract.mintWait(sac);

			setShowModal(true)
			await transaction.wait()
			setShowModal(false)
	
		}
		catch(error){
			console.log(error)
		}


	
	
		init()
	}

	function IndexPage() {
		return (
		  <div>
			<Head>
			  <title>dApp - $WAIT</title>
			  <meta name="viewport" content="initial-scale=1.0, width=device-width" />
			</Head>
		  </div>
		)
	}
	
	return (
		<>
			{IndexPage()}
			
			<div className="h-full flex justify-center ">
			<Modal {...{showModal, setShowModal, colorTheme, text, title}}></Modal>
				<>	
				<div>
					<Navbar{...{init, colorTheme, setColorTheme, reload, setShowModal, setText, setTitle}}></Navbar>
					<div className="bg-[url('../public/asset.png')] dark:bg-[url('../public/asset2.png')] bg-cover bg-no-repeat h-fit">
												<h1 className='dark:text-white px-12 py-16 w-full text-center font-bold text-5xl max-w-8xl'>Claim your $WAIT now, or maybe wait a little longer!</h1>

					<Progress {...{which, setWhich, checked, setShowModal, init, colorTheme, setText, setShowModal, setTitle, eli, reload, setEli}}></Progress>
					
				<div className='flex justify-center '>

				<div className='grid grid-rows-8 gap-4 lg:grid-cols-4 lg:grid-rows-2 max-w-7xl w-full mb-12 mx-4'>
					{sacs.map((row,i) => (
						<div className='flex justify-center h-fit'key={i}>

						<div  className=' w-full  flex items-center flex-col bg-white dark:bg-[#252E3F] lg:m-2 rounded-3xl'>
							<div className='w-full flex flex-row justify-between items-center lg:flex-col lg:items-center'>
								<div className='flex flex-col items-start lg:items-center'>
									<img className='w-32 h-32 p-5' src={row.image}></img>
									<h1 className=' pb-5 text-3xl font-semibold w-36 md:w-full dark:text-white px-5 text-center'>{row.name}</h1>
								</div>

								{checked?
								<div className='lg:w-full w-3/5 px-6 '>
								{row.inD==false
								?
									<h1 className='grd-msg bg-[#F0090B] text-white'>Not Eligible</h1>
								:
									<div>
										{row.C==false?
										<div>
											{which!=3?
											<h1 className='grd-msg'>Unlock First!</h1>

											:
											<button className='  bg-[#00FF8E] grd-msg hover:bg-[#00e37e] hover:border-2 hover:mb-3' onClick={() => {mintSpecific(row.id)}}>{row.cla} $WAIT</button>
										}	
										</div>
										:
										<h1 className='grd-msg bg-[#C511ED] text-white'> Claimed</h1>
										}
									</div>
								}
							</div>
								:
								<div className='w-3/5 sm:w-2/5 lg:w-full px-6 '>
									<h1 className='grd-msg'> TBD</h1>
								</div>
								}
							</div>
						</div>
					</div>
					))}
				</div>
				</div>
					<Demo></Demo>
					<Footer{...{colorTheme}}></Footer>
					</div>					
				</div>	
				</>
				
			</div>
		</>
	  )
}
