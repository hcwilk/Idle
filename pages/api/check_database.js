// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import axios from "axios"

export default async function handler(req, res) {
	const shit = await axios.get(
		`https://api.etherscan.io/api?module=account&action=txlist&address=0xb5588C411ba0bb7D38865fdC51D082d004e519F7&startblock=0&endblock=99999999&page=1&offset=10000&sort=acs&apikey=${process.env.NEXT_PUBLIC_API_KEY}`
	)

	const base = 0x0b3b38820000000000000000000000000000000000000000000000000000000000000000

	const checking = shit.data.result

	const checked = checking.filter(({functionName}) => functionName==="checkDatabase(string _address)");

	console.log(checked.length)

	const nerwer = checked.filter((v,i,a)=>a.findIndex(v2=>['from'].every(k=>v2[k] ===v[k]))===i)

	console.log(nerwer.length)

	const minted = checking.filter(({functionName}) => functionName==="mintAllWait()");


	const specific_minted = checking.filter(({functionName}) => functionName==="mintWait(uint256 sac)");


	const input = specific_minted[0].input.toString()

	console.log(input.slice(-1))

	console.log("What",minted.length)








	console.log("shit")

  res.status(200).json(minted)
}
