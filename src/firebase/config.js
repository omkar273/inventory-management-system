// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAVL05HZo-YrNX0M70sZsG7d8b3_uP4FcQ",
  authDomain: "inventory-management-8d05a.firebaseapp.com",
  projectId: "inventory-management-8d05a",
  storageBucket: "inventory-management-8d05a.appspot.com",
  messagingSenderId: "1093696496546",
  appId: "1:1093696496546:web:c9cd5763b17c37f4a9c8fb",
  measurementId: "G-40K30Y3LT8",
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
