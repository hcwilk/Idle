import { useEffect } from 'react'
import { app, db } from '../firebaseConfig'
import { collection, addDoc, getDocs } from "firebase/firestore"; 

export default function Home() {

	async function addData(){
		console.log("what")
		try {
			const docRef = await addDoc(collection(db, "Addresses"), {
			  first: "Ada",
			  last: "Lovelace",
			  born: 1815
			});
			console.log("Document written with ID: ", docRef.id);
		  } catch (e) {
			console.error("Error adding document: ", e);
		  }
	}

	async function readData() {
		const querySnapshot = await getDocs(collection(db, "users"));
		querySnapshot.forEach((doc) => {
		  console.log(`${doc.id} => ${doc.data()}`);
		});
	}

	useEffect(() => {
		console.log("hitting?")
		// init()
	},[])

	

  return (
    <div >
    	<h1 className='text-center'>If you really break it down to it's components</h1>
		<button onClick={addData}>bro just once</button>
		<button onClick={readData}>maybe</button>
    </div>
  )
}
