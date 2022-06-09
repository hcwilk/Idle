import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.css'
import { useEffect } from 'react'
import * as IPFS from 'ipfs-core'
export default function Home() {


	useEffect(() => {
		console.log("hitting?")
	},[])

	async function init(){
		const node = await IPFS.create()

		const stream = node.cat('QmZA3v4QLbbCuivR3mTfgCiLEBRNhpPbu2NVemxiFzXwYF')
		const decoder = new TextDecoder()
		let data = ''

		for await (const chunk of stream) {
		// chunks of data are returned as a Uint8Array, convert it back to a string
		data += decoder.decode(chunk, { stream: true })
		}	

		console.log(data)
	}

  return (
    <div >
    	<h1 className='text-center'>If you really break it down to it's components</h1>
		<button onClick={init}>bro just once</button>
    </div>
  )
}
