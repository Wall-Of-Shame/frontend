// Import the functions you need from the SDKs you need
import { getAuth } from "@firebase/auth";
import { getMessaging, getToken } from "@firebase/messaging";
import { initializeApp } from "firebase/app";
import { getDatabase } from "firebase/database";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyB3GqYKzh1mQnJuUGzyhYtJqzjpa8ahIDs",
  authDomain: "cs3216-2021-a3-wall-of-shame.firebaseapp.com",
  projectId: "cs3216-2021-a3-wall-of-shame",
  storageBucket: "cs3216-2021-a3-wall-of-shame.appspot.com",
  messagingSenderId: "942998076854",
  appId: "1:942998076854:web:98b0297a47cb1c0f911517",
  databaseURL:
    "https://cs3216-2021-a3-wall-of-shame-default-rtdb.asia-southeast1.firebasedatabase.app",
};

// Initialize Firebase
initializeApp(firebaseConfig);

export const auth = getAuth();

export const messaging = getMessaging();

export const database = getDatabase();
