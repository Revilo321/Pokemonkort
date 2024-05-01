// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app'
import { getAuth } from 'firebase/auth'
import { getFirestore } from 'firebase/firestore'
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyC1M02sRstmsHJTI8btv0ZN7ii5LjkfWDw",
  authDomain: "lemonadestand-8aa00.firebaseapp.com",
  databaseURL: "https://lemonadestand-8aa00-default-rtdb.europe-west1.firebasedatabase.app",
  projectId: "lemonadestand-8aa00",
  storageBucket: "lemonadestand-8aa00.appspot.com",
  messagingSenderId: "409479184085",
  appId: "1:409479184085:web:71698fd1c72afa2fadac5c",
  measurementId: "G-LZZQTSN8MS"
};


// Initialize Firebase
const app = initializeApp(firebaseConfig)

export const auth = getAuth(app)

export const db = getFirestore(app)
