
export default function Footer(){


	return(
		<div className="dark:bg-[#252E3F] h-fit">
		<hr className='mt-10  border-black'></hr>
	
						<div className='h-52 w-full flex flex-col items-center justify-center gap-6'>
							<h1 className='text-2xl font-bold text-center dark:text-white'>Coast- a #pulsechain development company</h1>
							<div className='flex justify-center'>
								<a href='https://twitter.com/0xCoast'><img src='twit.png'  className='h-16 w-16 mx-5 hover:border-2'></img></a>
	
	
								<a href='https://t.me/Coast0x'><img src='tele.png' className='h-16 w-16  mx-5 hover:border-2'></img> </a>
							</div>
						</div>
						
					<div className='flex justify-center'>
						<hr className='w-5/6 border-black mb-5'></hr>
					</div>

					<div className='w-full flex items-center justify-center mt-12'>
						<p className='w-3/5 text-center leading-loose dark:text-white'>No part of content produced by 
						<a className='text-[#324dff]'  href="https://0xwait.com/"> 0xWait </a>
						may be redistributed without express written permission from 0xCoast. This content is for educational and informational purposes only and should not constitute investment advice or an offer to sell or the solicitation of an offer to purchase any products or services. This information is not intended for any persons who are prohibited from receiving such information under the laws applicable to their place of citizenship, domicile or residence.</p>
					</div>
					<div className='w-full flex items-center justify-center py-12'>
						<p className='w-4/5 text-center leading-loose dark:text-white'> © All rights reserved 0xCoast.</p>
					</div>
	</div>
	)
}