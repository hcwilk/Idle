//import { app, db } from '../firebaseConfig'
//import { collection, addDoc, getDocs } from "firebase/firestore"; 
import React, {useEffect, useState} from 'react'
import Web3Modal from 'web3modal'
import {Contract, ethers} from 'ethers'
import Wait from '../artifacts/contracts/Wait.sol/Wait.json' 
import { WaitAddress } from '../wait_config'

//import Modal from './Components/modal'
//import {Chart, ArcElement} from 'chart.js'


export default function Home() {

	const [loadingState, setLoadingState] = useState('not-loaded');

	const [sacs,setSacs] = useState([])
	const [first,setFirst] = useState([])
	const [end,setEnd] = useState([])
	const [total, setTotal] = useState(0) 
	const [checked, setChecked] = useState(false) 
	const [addr, setAddr] = useState("")

	



	useEffect(()=>{
		init();
		window.ethereum.on('accountsChanged', function (accounts) {
			reload()
		  })
	}, []);

	async function init(){

		try{

			const web3Modal = new Web3Modal()
			const connection = await web3Modal.connect()
			const provider = new ethers.providers.Web3Provider(connection);
			const signer = provider.getSigner();
			const WaitContract = new ethers.Contract(WaitAddress, Wait.abi, signer);


			const data1 = await WaitContract.inDatabase();
			const claim1 = await WaitContract.haveClaimed();
			const jflkdfsdfa = await WaitContract.hasChecked();

			const arrayClaimable = await WaitContract.mintableAllWait();

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
		
			setLoadingState("loaded")

			const sum = yes.filter(({C}) => C ===false).reduce((partialSum, a) => partialSum + a.cla, 0);
			setTotal(sum)

		}
		catch(error){
			console.log(error)
		}
	}

	const load = e => {
		e.preventDefault()
		checkData()
	}


	async function checkData() {
		const web3Modal = new Web3Modal();
		const connection = await web3Modal.connect();
		const provider = new ethers.providers.Web3Provider(connection);
		const signer = provider.getSigner();
	
		let contract = new ethers.Contract(WaitAddress, Wait.abi, signer);
		let transaction = await contract.checkDatabase(addr);
		await transaction.wait()
	
	
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
		console.log(sac)
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
			<div className="h-full flex justify-center">
				{loadingState=='loaded' ?
				(
					<>
					
					<div>
						<div className='w-screen md:h-32 h-80 bg-[#252E3F] flex items-center justify-center md:flex-row flex-col'>
							<div className='h-24 w-24 '>
								<img src='WAIT.png'></img>
							</div>
							<h1 className='text-white text-6xl font-semibold mx-12'>$WAIT</h1> 
						</div>
						<div className='w-full bg-[#00e7fa] flex justify-center items-center '>
							<a className=" text-[#252e3f] text-2xl font-sans font-bold mx-20 my-6 text-center">Claim your $WAIT now, or maybe wait a little longer!</a>
						</div>
						
						{/* <div className='w-full bg-white flex justify-center'>
							<a className=" text-black text-center text-2xl font-sans mx-16 my-6 w-3/5">If you participated in any of the below sacrifices, you are eligible to claim free $WAIT tokens. You can claim by project or all at once.</a>
						</div> */}
	
						<div className='w-full bg-white items-center mt-6'>
							<form className='flex flex-col justify-center items-center' onSubmit={load}>
								<input className='w-2/3 h-16 text-xl font-semibolds text-center px-10 bg-gray-200' placeholder="Enter your Ethereum Address" onChange={(e) => setAddr(e.target.value)}></input>
	
								<button type='submit'  className='md:w-5/12 w-3/5 h-12 md:text-xl text-lg text-white text-center bg-[#324dff] border-4 border-black my-5'>Check Database!</button>
	
							</form>
	
						{/* {checked?
						<div className='w-full bg-white flex flex-col items-center'>
						{data.includes(true)?
						<>
						<h1 className='text-xl text-center '>checking address: {addr}</h1>
						<div className='md:w-5/12 h-16 w-3/5 lg:text-xl md:text-lg text-sm text-center bg-red-300 border-4 border-black my-5 flex justify-center items-center' ><h1 className='mx-5'>Oh No! It doesn't look like you participated in any of the sacrifices</h1> </div>
						</>
					
							:
							<>
							<h1 className='text-xl text-center'>checking address: {addr}</h1>
							<div className='md:w-5/12 h-16 w-3/5 lg:text-xl md:text-lg text-sm text-center bg-green-100 border-4 border-black my-5 flex justify-center items-center' ><h1 className='mx-5'>Success! Come back on July 5th to claim your {Math.floor(wait)} $WAIT</h1></div>
						</>
						}
					</div>
						:
	<></>
						} */}
						</div>
					<div className='flex justify-center'>
					{total>0?
								<button onClick={mintAll}  className='md:w-5/12 w-3/5 h-12 md:text-xl text-lg text-white text-center bg-[#324dff] border-4 border-black my-5'>Claim {total} $WAIT!</button>
								:
					<></>
				}
					</div>
						
					<div className='flex justify-between lg:flex-col'>
						
						<div className='flex justify-between lg:flex-row flex-col w-1/2 lg:w-full'>
							{first.map((row,i) => (
								<div key={i} className='lg:w-1/4 w-full flex items-center flex-col'>
									<div className='w-full flex flex-col items-center'>
										<h1 className='text-3xl font-semibold text-center'>{row.name}</h1>
										<img className='w-48 h-48 p-5' src={row.image}></img>
										
										<button className='w-full px-2' onClick={() => {mintSpecific(row.id)}}>
											{row.inD==false?
											<h1 className='w-full bg-red-300 text-center text-3xl border-2 border-black p-4'>Not Eligible to Claim</h1>
											:
											<div>
												{row.C==false?
												<h1 className='w-full  bg-green-100 text-center text-3xl border-2 border-black p-4'> Claim {row.cla} $WAIT</h1>
												:
												<h1 className='w-full  bg-yellow-100 text-center text-3xl border-2 border-black p-4'> You've already claimed!</h1>
												}
											</div>
											}
										</button>
										
										
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
											
											<button className='w-full px-2' onClick={() => {mintSpecific(row.id)}}>
												{row.inD==false?
												<h1 className='w-full bg-red-300 text-center text-3xl border-2 border-black p-4'>Not Eligible to Claim</h1>
											:
											<div>
												{row.C==false?
												<h1 className='w-full  bg-green-100 text-center text-3xl border-2 border-black p-4'> Claim {row.cla} $WAIT</h1>
												:
												<h1 className='w-full  bg-yellow-100 text-center text-3xl border-2 border-black p-4'> You've already claimed!</h1>
												}
											</div>
												}
											</button>
											
										</div>
									</div>
								))}
							</div>
							
							
						</div>
							
							
							

							
	
							<hr className='mt-10  border-black'></hr>
	
							<div className='h-52 w-full flex flex-col items-center justify-center'>
								<h1 className='text-2xl font-bold text-center'>Coast- a #pulsechain development company</h1>
								<div className='flex justify-center'>
								<a href='https://twitter.com/0xCoast'><img src='twit.png'  className='h-16 w-16 '></img></a>
								<img src='wifi.png' className='h-16 w-16 p-1'></img>
	
								</div>
							</div>
							<div className='flex justify-center'>
							</div>
							<div className='flex justify-center'>
								<hr className='w-5/6 border-black mb-5'></hr>
							</div>
	
							<div className='w-full flex items-center justify-center mt-12'>
								<p className='w-4/5 text-center leading-loose'>No part of content produced by 0xWait may be redistributed without express written permission from 0xCoast. This content is for educational and informational purposes only and should not constitute investment advice or an offer to sell or the solicitation of an offer to purchase any products or services. This information is not intended for any persons who are prohibited from receiving such information under the laws applicable to their place of citizenship, domicile or residence. © All rights reserved 0xCoast.</p>
							</div>
	
					</div>
					
					</>
				):(
					<p>
						Loading...
					</p>
				)}
			</div>
		</>
	  )
}
