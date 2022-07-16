
import Web3Modal from 'web3modal'
import {Contract, ethers} from 'ethers'
import Wait from '../../artifacts/contracts/Wait.sol/Wait.json' 
import { WaitAddress } from '../../wait_config'
import Web3 from 'web3'


export default function Progress({which, checked, init, setText, setShowModal, setTitle, eli})  {


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
					<button className="prg-but-no">UNLOCK</button>
				</div>
				<div className="prg-no">
					<h1 className="prg-title">Step 3: Claim $WAIT</h1>
					<button className="prg-but-no">MINT ALL</button>
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
					<button className="prg-but-no">UNLOCK</button>
				</div>
				<div className="prg-no">
					<h1 className="prg-title">Step 3: Claim $WAIT</h1>
					<button className="prg-but-no">MINT ALL</button>
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
				<div className="prg-yes">
					<h1 className="prg-title">Step 2: Unlock $WAIT</h1>
					<button onClick={unlock} className="prg-but-yes">UNLOCK</button>
				</div>
				<div className="prg-no">
					<h1 className="prg-title">Step 3: Claim $WAIT</h1>
					<button className="prg-but-no">MINT ALL</button>
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
					<div className="flex justify-center items-center prg-but-no bg-[#00FF8E] text-black">COMPLETE!</div>
				</div>
				<div className="prg-no ">
					<h1 className="prg-title">Step 2: Unlock $WAIT</h1>
					<div className="flex justify-center items-center prg-but-no bg-[#00FF8E] text-black">COMPLETE!</div>
				</div>
				<div className="prg-yes">
					<h1 className="prg-title">Step 3: Claim $WAIT</h1>
					<button onClick={mintAll} className="prg-but-yes">MINT ALL</button>
				</div>			</div>
		   
		</div>
	
		);
	}

}
