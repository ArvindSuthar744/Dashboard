// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDzpu6h0iuOcOdkUDPBRsml-0b5IfiMwQY",
  authDomain: "dashboard-c6ffd.firebaseapp.com",
  projectId: "dashboard-c6ffd",
  storageBucket: "dashboard-c6ffd.firebasestorage.app",
  messagingSenderId: "660251991067",
  appId: "1:660251991067:web:303642eaba6c74083b2cbe",
  measurementId: "G-7Y89HCEXR5"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const db = getFirestore(app)

export { db }
