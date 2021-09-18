// Import the functions you need from the SDKs you need
import { getAuth } from "@firebase/auth";
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCX_LTjURbRosk3fu5_WaiNB9Zbbrob0dU",
  authDomain: "cs3216-wall-of-shame.firebaseapp.com",
  projectId: "cs3216-wall-of-shame",
  storageBucket: "cs3216-wall-of-shame.appspot.com",
  messagingSenderId: "401056381743",
  appId: "1:401056381743:web:3a5f31d8280b1c0f5cbfda",
  measurementId: "G-FN95RXLLYT",
};

// Initialize Firebase
initializeApp(firebaseConfig);
export const auth = getAuth();
