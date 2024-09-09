import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyAJgwZ41KhlDFQdtcCTmHdG6odu_hGTDkA",
  authDomain: "web-application-cee1f.firebaseapp.com",
  projectId: "web-application-cee1f",
  storageBucket: "web-application-cee1f.appspot.com",
  messagingSenderId: "364546531367",
  appId: "1:364546531367:web:d6c6375af71444f69fae02",
  measurementId: "G-PTSP2SPEWL"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export { app, db };
