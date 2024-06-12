// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyB3cb7D1WEm63gyaIs1HSBiYtz5p6h6gvo",
  authDomain: "capstone-37552.firebaseapp.com",
  projectId: "capstone-37552",
  storageBucket: "capstone-37552.appspot.com",
  messagingSenderId: "141881020931",
  appId: "1:141881020931:web:024e716629aa405a32b436",
  measurementId: "G-P3FTXZ9SFM"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
