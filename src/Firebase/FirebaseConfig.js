// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "Enter your api key" ,
  authDomain: "Enter your authDomain" ,
  projectId: "Enter your projectId " ,
  storageBucket: "Enter your storageBucket",
  messagingSenderId: " Enter your messagingSenderId ",
  appId: " Enter your apId"
};


// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);