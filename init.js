// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyDC9zpVAnoBNi0T__-qUv6PbdA_sgrnbGY",
    authDomain: "webdevfinal-1b6d7.firebaseapp.com",
    projectId: "webdevfinal-1b6d7",
    storageBucket: "webdevfinal-1b6d7.appspot.com",
    messagingSenderId: "831425261552",
    appId: "1:831425261552:web:69f0d0e1e7a5193ef57735",
    measurementId: "G-CJPK72JB1N"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);