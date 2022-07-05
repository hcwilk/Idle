//import { app, db } from '../firebaseConfig'
//import { collection, addDoc, getDocs } from "firebase/firestore"; 
import Web3 from 'web3';
import React, {useEffect, useState} from 'react'
import Web3Modal from 'web3modal'
import {Contract, ethers} from 'ethers'
import Wait from '../artifacts/contracts/Wait.sol/Wait.json' 
import { WaitAddress } from '../wait_config'
import Head from 'next/head'


//import Modal from './Components/modal'
//import {Chart, ArcElement} from 'chart.js'


export default function Home() {


	const [loadingState, setLoadingState] = useState('loaded');

	const [sacs,setSacs] = useState([])
	const [first,setFirst] = useState([])
	const [end,setEnd] = useState([])
	const [total, setTotal] = useState(0) 
	const [checked, setChecked] = useState(false) 
	const [addr, setAddr] = useState("")
	const [id, setId] = useState("213");
	const [text, setText] = useState("Connect");


	


	
	


	useEffect( ()=>{


		window.ethereum.on('accountsChanged', function (accounts) {
		
			
			reload()
			

	
		  }) 


		  ethereum.request({ method: 'eth_accounts' }).then((accounts)=> {if(accounts.length>0){
			setAddr(accounts[0])
			init()
			setText("Connected!")

		  }
		  else{
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
	
			console.log("what the fuck is going on")
	
			console.log(yes)
		
	
			setFirst(yes.slice(0,4))
			setEnd(yes.slice(4,8))
		  }
		  console.log(accounts)}).catch(console.error);


		  


		  
		




	}, []);


	async function connect(){ 
		if (window.ethereum) {

 
		await window.ethereum.request({ method: "eth_requestAccounts" });
		window.web3 = new Web3(window.ethereum);
		
	   } else {
		console.log("No wallet");
	   }
	   init()
	}


	async function init(){

		try{

			
			const web3Modal = new Web3Modal()
			const connection = await web3Modal.connect()
			const provider = new ethers.providers.Web3Provider(connection);
			const signer = provider.getSigner();
			const WaitContract = new ethers.Contract(WaitAddress, Wait.abi, signer);


			setAddr(signer.provider.provider.selectedAddress)

			console.log('this is empty',addr)


			
			const data1 = await WaitContract.inDatabase();
			const claim1 = await WaitContract.haveClaimed();

			const jflkdfsdfa = await WaitContract.hasChecked();

			const arrayClaimable = await WaitContract.mintableAllWait();	

			let providerr = window.ethereum;
			
			const web3 = new Web3(providerr)
			
			const contract = new web3.eth.Contract(Wait.abi, WaitAddress)

			console.log(contract)


			contract.events.Reload().on('data', event => {
				const actual = signer.provider.provider.selectedAddress
				const checker = event.returnValues._user.toLowerCase()
				console.log('check',checker)
				console.log("addfdslfa",actual)
				console.log(checked==actual)
				if(checker==actual){
					reload()
				}
			})








			console.log(jflkdfsdfa)
			if(data1.includes(true)){
				setChecked(true)
			}
			else{
				setChecked(jflkdfsdfa)
			}
			
			
			console.log("data :", data1)

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

			console.log("what the fuck is going on")

			console.log(yes)
		

			setFirst(yes.slice(0,4))
			setEnd(yes.slice(4,8))

			const sum = yes.filter(({C}) => C ===false).reduce((partialSum, a) => partialSum + a.cla, 0);
			setTotal(sum)
		
			setLoadingState("loaded")


		}
		catch(error){
			console.log(error)
		}

		setLoadingState("loaded")

		console.log("what")


	}


	

	const load = e => {
		e.preventDefault()
		checkData()
	}

	function reload(){
		window.location.reload(false);
		console.log("hitting")
	
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
	



	async function checkData() {
		const web3Modal = new Web3Modal();
		const connection = await web3Modal.connect();
		const provider = new ethers.providers.Web3Provider(connection);
		const signer = provider.getSigner();
	
		let contract = new ethers.Contract(WaitAddress, Wait.abi, signer);

		const fsdaf = addr.toLowerCase()

		let transaction = await contract.checkDatabase(fsdaf);
		await transaction.wait()
	
	
	}

	async function addd(){

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
	
		  init()
		
		  if (wasAdded) {
			console.log('Thanks for your interest!');
		  } else {
			console.log('Your loss!');
		  }
		} catch (error) {
		  console.log(error);
		}
	  }

	async function mintAll() {
		const web3Modal = new Web3Modal();
		const connection = await web3Modal.connect();
		const provider = new ethers.providers.Web3Provider(connection);
		const signer = provider.getSigner();
	
		//sign the transaction
		let contract = new ethers.Contract(WaitAddress, Wait.abi, signer);
		let transaction = await contract.mintAllWait();
		await transaction.wait()
	
		init()
	
	}


	async function mintSpecific(sac) {
		const web3Modal = new Web3Modal();
		const connection = await web3Modal.connect();
		const provider = new ethers.providers.Web3Provider(connection);
		const signer = provider.getSigner();
	
		//sign the transaction
		let contract = new ethers.Contract(WaitAddress, Wait.abi, signer);
		let transaction = await contract.mintWait(sac);
		await transaction.wait()
	
		init()
	
	}

	return (
		<>
			{IndexPage()}
			
			<div className="h-full flex justify-center">
				
				<>	
				<div>
						<div className='w-full md:h-40 h-80 bg-[#252E3F] flex items-center justify-between md:flex-row flex-col'>
							<div className='flex justify-center items-center md:flex-row flex-col md:ml-24'>
								<div className='h-24 w-24 '>
									<img src='WAIT.png'></img>
								</div>
								<h1 className='text-white text-6xl font-semibold mx-12'>$WAIT</h1> 
							</div>
							<div>
								<button onClick={connect} className='rounded-full w-40 h-16 bg-blue-400 mr-12 mb-4' >{text} </button>
								<button onClick={addd} className='rounded-full w-40 h-16 bg-blue-400 md:mr-24' >Add to MetaMask</button>
							</div>
							
						</div>

						<div className='w-full bg-[#00e7fa] flex justify-center items-center '>
							<a className=" text-[#252e3f] text-2xl font-sans font-bold mx-20 my-6 text-center">Claim your $WAIT now, or maybe wait a little longer!</a>
						</div>

						{checked?
						<div className='w-full flex justify-center my-6'>
							<h1 className='text-2xl font-semibold text-center'>For Address {addr}</h1>
						</div>
						:
						<div className='w-full bg-white items-center mt-6'>
							<form className='flex flex-col justify-center items-center' onSubmit={load}>

								<button type='submit'  className='md:w-5/12 w-3/5 h-12 md:text-xl text-lg text-white text-center bg-[#324dff] border-4 border-black my-5'>Check Database!</button>

							</form>
						
						</div>

						}
						
						<div className='flex justify-center'>
						{total>0
						?
							<button onClick={mintAll}  className='md:w-5/12 w-3/5 h-12 md:text-xl text-lg text-white text-center bg-[#324dff] border-4 border-black my-5'>Claim {total} $WAIT!</button>
						:
							<>
							</>
						}
						</div>

				
				<div className='flex justify-between lg:flex-col' key={id}>
				<div className='flex justify-between lg:flex-row flex-col w-1/2 lg:w-full'>
					{first.map((row,i) => (
						<div key={i} className='lg:w-1/4 w-full flex items-center flex-col'>
							<div className='w-full flex flex-col items-center'>
								<h1 className='text-3xl font-semibold text-center'>{row.name}</h1>

								<img className='w-48 h-48 p-5' src={row.image}></img>
								
								{checked?
								<div className='w-full px-6'>
								{row.inD==false
								?
									<h1 className='w-full bg-red-300 text-center text-3xl border-2 border-black p-4'>Not Eligible to Claim</h1>
								:
									<div>
										{row.C==false?
										<button className='w-full  bg-green-100 text-center text-3xl border-2 border-black p-4' onClick={() => {mintSpecific(row.id)}}> Claim {row.cla} $WAIT</button>
										:
										<h1 className='w-full  bg-yellow-100 text-center text-3xl border-2 border-black p-4'> You've already claimed!</h1>
										}
									</div>
								}
							</div>
								:
								<div className='w-full px-6'>
									<h1 className='w-full  text-center text-3xl border-2 border-black p-4'> Check Address</h1>
								</div>
								}
							</div>
						</div>
					))}
				</div> 
					
				<div className='flex lg:justify-between lg:flex-row flex-col w-1/2 lg:w-full'>
					{end.map((row,i) => (
						<div key={i} className='lg:w-1/4 w-full flex items-center flex-col'>
							<div className='lg:mt-12 w-full flex flex-col items-center'>
								<h1 className='text-3xl font-semibold text-center'>{row.name}</h1>

								<img className='w-48 h-48 p-5' src={row.image}></img>
								{checked?
								<div className='w-full px-6'>
								{row.inD==false
								?
									<h1 className='w-full bg-red-300 text-center text-3xl border-2 border-black p-4'>Not Eligible to Claim</h1>
								:
									<div>
										{row.C==false?
										<button className='w-full  bg-green-100 text-center text-3xl border-2 border-black p-4' onClick={() => {mintSpecific(row.id)}}> Claim {row.cla} $WAIT</button>
										:
										<h1 className='w-full  bg-yellow-100 text-center text-3xl border-2 border-black p-4'> You've already claimed!</h1>
										}
									</div>
								}
							</div>
								:
								<div className='w-full px-6'>
									<h1 className='w-full  text-center text-3xl border-2 border-black p-4'> Check Database</h1>
								</div>
								}

								
							</div>
						</div>
					))}
				</div>		
			</div>
				
				
					

					<hr className='mt-10  border-black'></hr>
	
					<div className='h-52 w-full flex flex-col items-center justify-center gap-6'>
						<h1 className='text-2xl font-bold text-center'>Coast- a #pulsechain development company</h1>
						<div className='flex justify-center'>
							<a href='https://twitter.com/0xCoast'><img src='twit.png'  className='h-16 w-16 mx-5'></img></a>

							<img src='wifi.png' className='h-16 w-16 p-1 mx-5'></img>
						</div>
					</div>
						
					<div className='flex justify-center'>
						<hr className='w-5/6 border-black mb-5'></hr>
					</div>

					<div className='w-full flex items-center justify-center mt-12'>
						<p className='w-3/5 text-center leading-loose'>No part of content produced by 
						<a className='text-[#324dff]'  href="https://0xwait.com/"> 0xWait </a>
						may be redistributed without express written permission from 0xCoast. This content is for educational and informational purposes only and should not constitute investment advice or an offer to sell or the solicitation of an offer to purchase any products or services. This information is not intended for any persons who are prohibited from receiving such information under the laws applicable to their place of citizenship, domicile or residence.</p>
					</div>
					<div className='w-full flex items-center justify-center mt-12'>
						<p className='w-4/5 text-center leading-loose'> © All rights reserved 0xCoast.</p>
					</div>
				</div>	
				</>
				
			</div>
		</>
	  )
}
