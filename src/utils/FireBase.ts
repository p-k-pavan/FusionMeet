// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getAuth} from "firebase/auth"
import { collection,getFirestore } from "firebase/firestore";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCJgK2cfzFHsdvxpw5JUslovgVDFWBEogs",
  authDomain: "fusionmeet.firebaseapp.com",
  projectId: "fusionmeet",
  storageBucket: "fusionmeet.appspot.com",
  messagingSenderId: "169576420377",
  appId: "1:169576420377:web:a89cc23147bc45ed200688",
  measurementId: "G-33RV1H5HEZ"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const firebaseAuth = getAuth(app);
export const  firebaseDB = getFirestore(app);

export const userRef = collection(firebaseDB,"users");
export const meetingsRef = collection(firebaseDB,"meetings")