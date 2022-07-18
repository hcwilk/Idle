
import Web3Modal from 'web3modal'
import {Contract, ethers} from 'ethers'
import Wait from '../../artifacts/contracts/Wait.sol/Wait.json' 
import { WaitAddress } from '../../wait_config'
import Web3 from 'web3'
import axios from 'axios'


export default function Progress({which, setWhich, checked, init, setText, setShowModal, setTitle, eli})  {


	async function checkData() {

		try{



			setTitle("Hang tight! We're checking the database for your address")
			setText("Checking eligibility can take up to 30 seconds. The page should refresh on it's own. If it gets stuck, try refreshing manually")
		const web3Modal = new Web3Modal();
		const connection = await web3Modal.connect();
		const provider = new ethers.providers.Web3Provider(connection);
		const signer = provider.getSigner();
	
		let contract = new ethers.Contract(WaitAddress, Wait.abi, signer);


		let transaction = await contract.checkDatabase(signer.provider.provider.selectedAddress.toLowerCase());
		setShowModal(true)
		await transaction.wait()
		}
		catch(error){
			console.log(error)
		}
	}

	async function handleModal(){
		setTitle("Feel like you've already unlocked your $WAIT?")
		setText("Click CHECK AGAIN to check! If nothing changes when you recheck, you'll need to unlock your wait by clicking UNLOCK.")
		setShowModal(true)
	}

	async function handleClick(){
		const web3Modal = new Web3Modal();
		const connection = await web3Modal.connect();
		const provider = new ethers.providers.Web3Provider(connection);
		const signer = provider.getSigner();

		console.log("hitting")
			const shit = await axios.get(
				`https://api-rinkeby.etherscan.io/api?module=account&action=txlist&address=0xAE14B98b907A5aa3B59904aFE3B400b24374Df13&startblock=0&endblock=99999999&page=1&offset=1000&sort=desc&apikey=${process.env.NEXT_PUBLIC_API_KEY}`
			)


			const checking = shit.data.result

			
			let only
			
			if(checking!=='undefined'){

				only = checking.filter(({from}) => signer.provider.provider.selectedAddress ===from);
			}
			else{
				only = []
			}

			if(only.length>0){
				setWhich(3)
				localStorage.setItem(signer.provider.provider.selectedAddress,true)
			}
			else{
			setTitle("Looks like you haven't unlocked your $WAIT yet!")
			setText("Click UNLOCK so you're able to mint your $WAIT")
			setShowModal(true)
			}
	}

	
	async function unlock(){

		setText("This funds your Chainklink node transaction with a small amount of ETH!")
		setTitle("Hang Tight! We are unlocking your $WAIT tokens")

		// listen()
		
		try{
				const web3Modal = new Web3Modal()

		const connection = await web3Modal.connect()

		const provider = new ethers.providers.Web3Provider(connection);




	

		

		const signer = provider.getSigner();



		const tx = await signer.sendTransaction({
			to: "0x64252735A0E1624F568a963c37C436b823848F87",
			value: ethers.utils.parseEther(".005")
		});
		

		setShowModal(true)

		await tx.wait()
		localStorage.setItem(signer.provider.provider.selectedAddress,true)

		setShowModal(false)




		init(web3Modal)
	}
		catch(error){
			console.log(error)
		}
	
	}


	async function mintAll() {
		setTitle("Hang Tight! Metamask is confirming your transaction")
		setText("You should see your $WAIT in your wallet in just a moment!")


		const web3Modal = new Web3Modal();
		const connection = await web3Modal.connect();
		const provider = new ethers.providers.Web3Provider(connection);
		const signer = provider.getSigner();
		let contract = new ethers.Contract(WaitAddress, Wait.abi, signer);
		let transaction = await contract.mintAllWait();

		setShowModal(true)
		await transaction.wait()
		setShowModal(false)
	
		init(web3Modal)
	
	}

	
	if(which==1){
		return (
			<div className='flex justify-center '>
{	checked? 

			<div className="prg-cont">
			
				<div className="prg-yes ">
					<h1 className="prg-title text-center">Step 1: Check Eligibility</h1>
					<button onClick={checkData} className=" bg-[#C511ED] prg-but-yes  ">RECHECK ELIGIBILITY</button>
				</div>
				<div className="prg-no">
					<h1 className="prg-title">Step 2: Unlock $WAIT</h1>
					<div className="prg-but-no flex justify-center items-center">UNLOCK</div>
				</div>
				<div className="prg-no">
					<h1 className="prg-title">Step 3: Claim $WAIT</h1>
					<div className="prg-but-no flex justify-center items-center">MINT ALL</div>
				</div>			
			</div>

:
			<div className="prg-cont">
				<div className="prg-yes">
					<h1 className="prg-title">Step 1: Check Eligibility</h1>
					{eli=='Connect Wallet Above!'?
										<div className="prg-but-yes flex justify-center items-center bg-gray-100 text-black text-lg text-center  sm:text-2xl">{eli}</div>
:
					<button onClick={checkData} className="prg-but-yes">{eli}
					</button>
					
					}
				</div>
				<div className="prg-no">
					<h1 className="prg-title">Step 2: Unlock $WAIT</h1>
					<div className="prg-but-no flex justify-center items-center">UNLOCK</div>
				</div>
				<div className="prg-no">
					<h1 className="prg-title">Step 3: Claim $WAIT</h1>
					<div className="prg-but-no flex justify-center items-center">MINT ALL</div>
				</div>			
			</div>
			}
		   
		</div>
	
		);
	
	}
	else if(which==2){
		return (
			<div className='flex justify-center '>
				<div className="prg-cont">
					<div className="prg-no">
						<h1 className="prg-title">Step 1: Check Eligibility</h1>
						<div className="flex justify-center items-center prg-but-no bg-[#00FF8E] text-black">COMPLETE!</div>
					</div>
					<div className="prg-yes gap-4">
						<h1 className="prg-title">Step 2: Unlock $WAIT</h1>
							<button onClick={unlock} className="prg-but-yes py-3">UNLOCK</button>
							<div className="w-full flex items-center justify-center">
								<button onClick={handleClick} className="prg-but-yes text-xl h-12 w-2/3">CHECK AGAIN</button>
								<button onClick={handleModal}><img src='ingo.png' className='w-12 h-12'></img></button>				  
							</div>
					</div>
					<div className="prg-no">
						<h1 className="prg-title">Step 3: Claim $WAIT</h1>
						<div className="prg-but-no flex justify-center items-center">MINT ALL</div>
					</div>			
				</div>
			</div>
	
		);
	}
	else{
		return (
			<div className='flex justify-center '>
			<div className="prg-cont">
				<div className="prg-no">
					<h1 className="prg-title">Step 1: Check Eligibility</h1>
					<div className="flex justify-center items-center prg-but-no bg-[#00FF8E]  text-black">COMPLETE!</div>
				</div>
				<div className="prg-no ">
					<h1 className="prg-title">Step 2: Unlock $WAIT</h1>
					<div className="flex justify-center items-center prg-but-no bg-[#00FF8E]  text-black">COMPLETE!</div>
				</div>
				<div className="prg-yes">
					<h1 className="prg-title">Step 3: Claim $WAIT</h1>
					<button onClick={mintAll} className="prg-but-yes">MINT ALL</button>
				</div>			</div>
		   
		</div>
	
		);
	}

}
