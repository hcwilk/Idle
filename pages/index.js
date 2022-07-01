//import { app, db } from '../firebaseConfig'
//import { collection, addDoc, getDocs } from "firebase/firestore"; 
import React, {useEffect, useState} from 'react'
import Web3Modal from 'web3modal'
import {Contract, ethers} from 'ethers'
import Wait from '../artifacts/contracts/Wait.sol/Wait.json' 
import { WaitAddress, wait_abi } from '../wait_config'

//import Modal from './Components/modal'
//import {Chart, ArcElement} from 'chart.js'


export default function Home() {

	const [loadingState, setLoadingState] = useState('not-loaded');
	const [id, setId] = useState("213");
	const [id2, setId2] = useState("21212123");
	const [id3, setId3] = useState("2123");
	const [id4, setId4] = useState("21234");
	const [id5, setId5] = useState("212345");
	const [id6, setId6] = useState("212346");

	const [sacs,setSacs] = useState([])
	const [data, setData] = useState([false, false, false, false, false, false, false, false])
	const [claim, setClaim] = useState([false, false, false, false, false, false, false, false])


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

			console.log("data :", data1)

			setData(data1)
			setClaim(claim1)

			setSacs([{
				name: "Pulse",
				image: "pulse.png",
				inD: data[0],
				C: claim[0]
	
			},
			{
				name: "PulseX",
				image: "pulsex.png",
				inD: data[1],
				C: claim[1]
			},
			{
				name: "Liquid Loans",
				image: "liquidloans.png",
				inD: data[2],
				C: claim[2]	
			},
			{
				name: "Hurricash",
				image: "hurricash.png",
				inD: data[3],
				C: claim[3]		},
			{
				name: "Genius",
				image: "genius.png",
				inD: data[4],
				C: claim[4]		},
			{
				name: "Mintra",
				image: "mintra.png",
				inD: data[5],
				C: claim[5]		},
			{
				name: "Phiat",
				image: "phiat.png",
				inD: data[6],
				C: claim[6]		},
			{
				name: "I.M.D",
				image: "imd.png",
				inD: data[7],
				C: claim[7]		}]
			)
		

			
		
			setLoadingState("loaded")
		}
		catch(error){
			console.log(error)
		}
	}


	function reload(){
		setId(Math.random().toString())
		setId2(Math.random().toString())
		setId5(Math.random().toString())
		setId3(Math.random().toString())
		setId4(Math.random().toString())
		setId6(Math.random().toString())
	}

	async function checkData() {
		const web3Modal = new Web3Modal();
		const connection = await web3Modal.connect();
		const provider = new ethers.providers.Web3Provider(connection);
		const signer = provider.getSigner();
	
		//sign the transaction
		let contract = new ethers.Contract(WaitAddress, wait_abi, signer);
		let transaction = await contract.checkDatabase();
		await transaction.wait()
	
		init()
	
	}

	async function mintAll() {
		const web3Modal = new Web3Modal();
		const connection = await web3Modal.connect();
		const provider = new ethers.providers.Web3Provider(connection);
		const signer = provider.getSigner();
	
		//sign the transaction
		let contract = new ethers.Contract(WaitAddress, wait_abi, signer);
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
		let contract = new ethers.Contract(WaitAddress, wait_abi, signer);
		let transaction = await contract.mintWait(sac);
		await transaction.wait()
	
		init()
	
	}


	useEffect(() => {
		console.log("hitting?")
		// init()
	},[])

	

  return (
    <>
		<div className="h-full flex justify-center">
			{loadingState!=='not-loaded' ?
			(
				<>
				<div>
					<div className='w-full bg-[#00e7fa] flex flex-col relative justify-center items-center lg:flex-row gap-5'>
						<a className=" text-[#252e3f] text-4xl font-sans font-bold mx-20 my-6">Claim Your Free $WAIT</a>
					</div>
					<div className='w-full bg-white flex flex-col relative justify-center items-center lg:flex-row gap-5'>
						<a className=" text-black text-center text-4xl font-sans font-thin mx-16 my-6">If you participated in any of the below sacrifices, you are eligible to claim free $WAIT tokens. You can claim by project or all at once.</a>
					</div>
					{data.includes(true) ?
					<div className='w-full bg-white flex flex-col relative justify-center items-center lg:flex-row gap-5'>
						<button className='w-5/12 h-20 text-xl text-white text-center bg-[#324dff] border-4 border-black my-5' onClick={mintAll}>Claim All $WAIT</button>
					</div>
					:
					<div className='w-full bg-white flex flex-col relative justify-center items-center lg:flex-row gap-5'>
						<button className='w-5/12 h-20 text-xl text-white text-center bg-[#324dff] border-4 border-black my-5' onClick={checkData}>Check Database!</button>
					</div>
					}

					{sacs.map((sac,index) => (
						<div key={sac.name} className='w-full flex flex-col md:flex-row bg-white items-center justify-center pt-6'>
							<div>
								<div className='h-80 w-80 md:h-40 md:w-40 m-5'>
									<img src={sac.image}></img>
								</div>
								<div className='w-full flex justify-center'>
									<a className="w-full text-black text-center text-4xl font-sans font-thin my-6 justify-center">{sac.name}</a>
								</div>								
							</div>
							<div>
								<div className='w-full bg-white flex flex-col relative justify-center lg:flex-row gap-5'>
									<a className=" text-black text-center text-xl font-sans mx-16 my-6">If you participated in the {sac.name} sacrifice, you are eligible to claim free $WAIT tokens. You can claim your $WAIT for PLS here.</a>
								</div>
								{sacs[index].inD ?
									
									<div>
									{sacs[index].C ?
										<div className='w-full bg-white flex flex-col relative justify-center items-center lg:flex-row gap-5'>
											<button className='w-4/5 h-20 text-xl text-black text-center bg-red-200 border-2 border-black my-5'>Already Claimed for {sac.name}</button>
										</div>
									:
										<div className='w-full bg-white flex flex-col relative justify-center items-center lg:flex-row gap-5'>
											<button className='w-4/5 h-20 text-xl text-black text-center bg-green-200 border-2 border-black my-5' onClick={ () => {mintSpecific(index)}} >CLAIM $WAIT FOR {sac.name}</button>
										</div>
									}
									</div>

							
									:
									
									<div className='w-full bg-white flex flex-col relative justify-center items-center lg:flex-row gap-5'>
										<button className='w-4/5 h-20 text-xl text-black text-center bg-white border-2 border-black my-5'>Unable to claim for  {sac.name}</button>
									</div> 
								}
								
							</div>
						</div>
					))}
					
					
				</div>
				
				</>
			):(
				<p>
					Not Loading
				</p>
			)}
		</div>
	</>
  )
}
