import React,{ useEffect, useState } from "react";
import { useWeb3React } from '@web3-react/core';
import { injected, walletconnect, resetWalletConnector, walletlink } from '../../conect/connectors';
import { getContract } from "../../conect/contract";


export default function Wallet({init, reload})  {

	const web3reactContext = useWeb3React(); 

	const {
		connector,
		library,
		chainId,
		account,
		activate,
		deactivate,
		active,
		error
	  } = web3reactContext;

	const [activatingConnector, setActivatingConnector] = React.useState();
	React.useEffect(() => {
	  if (activatingConnector && activatingConnector === connector) {
		setActivatingConnector(undefined);
	  }    
	  if(web3reactContext.account!==undefined){
		init()
		if(connector.walletConnectProvider===undefined){

			localStorage.setItem("Wallet","MetaMask") 
		}
		else{ 


			console.log("this shit is about to hit")
			localStorage.setItem("Wallet","WC")




			if (localStorage.getItem("loaded")=='false'){
				localStorage.setItem("loaded",true)
				reload()
			}


		
			
		}

	  }
	}, [activatingConnector, connector]);

	const [open, setOpen] = useState(false) 

	const toggleOpen = () =>{
		setOpen(!open)
	}

	


	useEffect(() => {
		if(localStorage.getItem("Wallet")==="MetaMask"){
			connectMetamaskSimple()
			 
		}
		else if(localStorage.getItem("Wallet")==="WC"){
			connectWalletConnectSimple()
		}
	},[])



	const disconnectMetamaskSimple = () => {
	
		localStorage.setItem("Wallet","")
		try {
			web3reactContext.deactivate();
			reload()
		} catch (ex) {
			console.log(ex);
		}
	};



	const handleConnect = async () => {
		localStorage.setItem("loaded",false)
		
		connectWalletConnectSimple()
	}

	//web3react metamask
	const connectMetamaskSimple = async () => {

		try {
			await web3reactContext.activate(injected);

			console.log(web3reactContext)
		} catch (ex) {
			console.log(ex);
		}
	};

	//web3react walletconnect
	const connectWalletConnectSimple = async () => {

		try {
			resetWalletConnector(walletconnect);
			await web3reactContext.activate(walletconnect);

			
		} catch (ex) {
			console.log(ex);
		}
	};

	
		return (
		// 	<div className="flex flex-col space-y-7 items-start pt-10 w-1/2 border-2 border-yellow-300">
		// 	<h2>Web3React Control</h2>
		// 	{web3reactContext.account ? <p>{web3reactContext.account}</p> : <p>Not connected</p>}
		// 	<div className="flex space-x-3">
		// 		<button
		// 			className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
		// 			onClick={checkInfoSimple}
		// 		>
		// 			Write To Contract Via Web3React
		// 		</button>

		// 		<button
		// 			className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
		// 			onClick={checkInfoSimple}
		// 		>
		// 			Check web3react Context
		// 		</button>
		// 		<button
		// 			className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
		// 			onClick={disconnectMetamaskSimple}
		// 		>
		// 			Disconnect Web3React
		// 		</button>
		// 	</div>
		// 	<div className="flex space-x-3">
		// 		<button
		// 			className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
		// 			onClick={connectMetamaskSimple}
		// 		>
		// 			Connect Metamask Via Web3-React
		// 		</button>
		// 	</div>
		// 	<div className="flex space-x-3">
		// 		<button
		// 			className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
		// 			onClick={connectWalletConnectSimple}
		// 		>
		// 			Connect walletconnect Via Web3-React
		// 		</button>
		// 	</div>
		
			
		// </div>
		<div className="relative inline-block text-left w-72 md:w-1/3">
			{web3reactContext.account==undefined?
			<>
						<div>
				
				<button type="button" onClick={() => {toggleOpen()}} className="btn-nav w-full text-xl hover:border-2 dark:border-white border-black">
				Connect
				<div className="ml-6">
					{open?
						<img className="w-6 h-6" src="up.png"></img>
						:
						<img className="w-6 h-6" src="drop.png"></img>
						}
				</div>
						
				</button>
			</div>
			{
				open?
				<div className=" relative md:absolute w-full rounded-3xl shadow-lg  mt-1" >
					<div className="rounded-full">
						<div className="flex justify-center items-center bg-[#324DFF] rounded-t-xl hover:border-2 dark:border-white border-black">
							<button onClick={connectMetamaskSimple} className="w-3/4 h-fit  text-white text-lg  font-semibold mt-1 p-4"> MetaMask</button>
							<img src="Meta.png" className="w-12 h-12 mr-3"></img>						
						</div>
						<div className="flex justify-center">						  
							<hr className='w-full border-black '></hr>
						</div>
						<div className="flex justify-center items-center bg-[#324DFF] hover:border-2 dark:border-white border-black ">
							<button onClick={handleConnect} className="w-3/4 h-fit bg-[#324DFF] text-white text-lg font-semibold  p-4">Wallet Connect</button>
							<img src="wallet.png" className="w-12 h-12 mr-3"></img>						
						</div>
						<div className="flex justify-center ">						  
							<hr className='w-full border-black '></hr>
						</div>

						<button onClick={disconnectMetamaskSimple} className="w-full h-fit bg-[#324DFF] text-lg text-white rounded-b-xl font-semibold p-4 hover:border-2 dark:border-white border-black">Disconnect / Clear Cache</button>

					</div>
			</div>
			:
			<></>
			}
			</>
			:
			<>
			
			<button type="button" onClick={disconnectMetamaskSimple} className="btn-nav text-xl w-full">
				Disconnect
			</button>
			</>
	
}



</div>
			)

}
