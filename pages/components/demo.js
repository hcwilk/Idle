
import Image from "next/image"
export default function Demo(){


	return(
		<div className="flex justify-center mx-4">
			<div className="bg-[url('../public/dmlight.png')] dark:bg-[url('../public/please.jpg')] w-full h-fit bg-no-repeat bg-cover rounded-3xl bg-center max-w-7xl dark:bg-top">
				<div className="flex flex-col-reverse md:flex-row items-center">
					<div className="w-1/2 flex justify-center flex-col">
						<div className="flex flex-col justify-start md:ml-24">
							<h1 className="text-white dark:text-black text-5xl font-bold w-full text-center md:text-left">Use Free Demo Tool</h1>
							<p className="w-full my-6 text-2xl text-white text-center md:text-left dark:text-black">Check your eligibility against the same database without connecting your wallet or paying gas fees. Just paste in your ETH address.</p>
								<a className="w-full lg:w-3/5"  href="https://demo.0xwait.com/">
									<div className='btn-nav w-full   md:mb-0 mb-6' >
									Demo Site
									</div>
								</a>
						</div>
					</div>
					<div className="w-1/2 flex justify-center items-center mt-4 ">
						<img src={'coins.png'} ></img>
					</div>
				</div>
			</div>
		</div>
	)
}