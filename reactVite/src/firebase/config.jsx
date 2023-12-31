// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyBSupfkafMwKqffMvoIQyPX2o92pZXAfBk",
    authDomain: "yogafinalbasmach.firebaseapp.com",
    projectId: "yogafinalbasmach",
    storageBucket: "yogafinalbasmach.appspot.com",
    messagingSenderId: "18174727922",
    appId: "1:18174727922:web:35ff0679508a6be860626b"
};

// Initialize Firebase
initializeApp(firebaseConfig);


export const storage = getStorage(); 