import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getStorage } from "firebase/storage";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
    apiKey: "AIzaSyChP1q2fHyGITSMZx86KODRpBxTXlS23fY",
    authDomain: "oshxona-project.firebaseapp.com",
    databaseURL: "https://oshxona-project-default-rtdb.firebaseio.com",
    projectId: "oshxona-project",
    storageBucket: "oshxona-project.appspot.com",
    messagingSenderId: "405762888921",
    appId: "1:405762888921:web:92df91a36c6fe84f7fdac8",
    measurementId: "G-JZ2Q6W91CN"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const auth = getAuth();
export const storage = getStorage();
export const firestore = getFirestore(app);