// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import {getFirestore} from 'firebase/firestore'
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCh_5QQ_URU0vZAfkdijvigFyKToYo4pds",
  authDomain: "wait-9ba5d.firebaseapp.com",
  databaseURL: "https://wait-9ba5d-default-rtdb.firebaseio.com",
  projectId: "wait-9ba5d",
  storageBucket: "wait-9ba5d.appspot.com",
  messagingSenderId: "270138222943",
  appId: "1:270138222943:web:91ba709496b4e5e412aeea",
  measurementId: "G-P0MNMRD8T8"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const db = getFirestore(app)