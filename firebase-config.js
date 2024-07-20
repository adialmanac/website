// firebase-config.js
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyA3G26oQuyOdPttTRQlbDLDBTNWLaLcEKc",
  authDomain: "adialamanac.firebaseapp.com",
  projectId: "adialamanac",
  storageBucket: "adialamanac.appspot.com",
  messagingSenderId: "610164305036",
  appId: "1:610164305036:web:b1adb9ec9adb442a2e1fa9",
  measurementId: "G-0ZJBZHLW0L"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

export { auth };
