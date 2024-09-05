// Import the functions you need from the SDKs you need
const { initializeApp } = require("firebase/app");
const { getFirestore } = require("firebase/firestore");
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAJgwZ41KhlDFQdtcCTmHdG6odu_hGTDkA",
  authDomain: "web-application-cee1f.firebaseapp.com",
  projectId: "web-application-cee1f",
  storageBucket: "web-application-cee1f.appspot.com",
  messagingSenderId: "364546531367",
  appId: "1:364546531367:web:d6c6375af71444f69fae02",
  measurementId: "G-PTSP2SPEWL"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

module.exports = { app, db };