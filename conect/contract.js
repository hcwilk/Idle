import { Contract } from '@ethersproject/contracts';
import Wait from '../artifacts/contracts/Wait.sol/Wait.json' 

export const contractAddress = '0xca393f91600f8fb1A4cAF3a93fb086219b27760a';

export const getContract = (library, account) => {
	const signer = library.getSigner(account).connectUnchecked();
	var contract = new Contract(contractAddress, Wait.abi, signer);
	return contract;
};

 