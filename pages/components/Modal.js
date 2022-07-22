export default function Modal({showModal, setShowModal, colorTheme, text, title})  {


	function toggleModal(){
		setShowModal(false)
	}


    return (
		<>
		{showModal?
	 <div className="relative z-10" >
		<div className="fixed inset-0 bg-gray-500  bg-opacity-75 transition-opacity"></div>
			<div className="fixed z-10 inset-0 overflow-y-auto mt-32">
				<div className="flex items-end sm:items-center justify-center min-h-full p-4 text-center sm:p-0">
					<div className="relative bg-white  rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:max-w-5xl sm:w-full">
						<div className="bg-white dark:bg-[#494E70] px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
							<div className="md:flex md:items-start">
								<div className="flex justify-center">
									<img src="Spinn.gif" className="w-16 h-16"></img>
								</div>
					
							<div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-">
								<h3 className="text-3xl leading-6  text-gray-900 mt-6 font-semibold dark:text-white  w-full " >{title}</h3>
								<div className="mt-4">
									<p className=" text-gray-500 dark:text-white pb-6">{text}
									</p>
		
								</div>
							</div>

							




							
						</div>
						<>
						
						{title=="Feel like you've already unlocked your $WAIT?" || title=="Looks like you haven't unlocked your $WAIT yet!" || title=="WalletConnect"?
						<div className="flex justify-end">
							<button onClick={()=> {setShowModal(false)}} className="bg-[#252E3F] text-white h-10 w-20 rounded-2xl">Close</button>
						</div>
						:
						<></>
						}
						</>
						
						
					</div>
				
				</div>
			</div>
		</div>
	</div>	
	:
		<></>
		}
       
	</>

    );
}
