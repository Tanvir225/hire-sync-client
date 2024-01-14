// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCRuGusaAsGUN9DpbRdQsV1GzKJTyYcH8g",
  authDomain: "hire-sync-96ea5.firebaseapp.com",
  projectId: "hire-sync-96ea5",
  storageBucket: "hire-sync-96ea5.appspot.com",
  messagingSenderId: "452669876423",
  appId: "1:452669876423:web:f7791c161320f0b9e376e2"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const auth = getAuth(app)


export default auth