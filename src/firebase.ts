// Import the functions you need from the SDKs you need
import { getAuth } from "@firebase/auth";
import { getMessaging, getToken } from "@firebase/messaging";
import { initializeApp } from "firebase/app";

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
};

// Initialize Firebase
initializeApp(firebaseConfig);

export const auth = getAuth();

const messaging = getMessaging();
getToken(messaging, {
  vapidKey:
    "BHPkVosHmRtZQ6gEXYws3DnbtXw-MTngfNYUPgsgF209IETuF-wWOGGXr_VdPlVgeDrbmT1dW8DEk6qSYrEWF4g",
})
  .then((currentToken) => {
    if (currentToken) {
      // Send the token to your server and update the UI if necessary
      console.log('here is token')
      console.log(currentToken);
      // TODO: Store token
    } else {
      // Show permission request UI
      console.log(
        "No registration token available. Request permission to generate one."
      );
    }
  })
  .catch((err) => {
    console.log("An error occurred while retrieving token. ", err);
    // ...
  });

