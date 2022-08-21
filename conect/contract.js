import { Contract } from '@ethersproject/contracts';
import Idle from '../artifacts/contracts/Idle.sol/Idle.json' 

export const contractAddress = '0x6E3C57228136785713aCc2b770744Bd3bB16CAd0';

export const getContract = (library, account) => {
	const signer = library.getSigner(account).connectUnchecked();
	var contract = new Contract(contractAddress, Idle.abi, signer);
	return contract;
};

 