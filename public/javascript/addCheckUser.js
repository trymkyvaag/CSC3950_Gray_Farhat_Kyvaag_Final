const firebase = require('firebase/app');
const db = require('firebase/database');

var config = {
    apiKey: "AIzaSyDC9zpVAnoBNi0T__-qUv6PbdA_sgrnbGY",
    authDomain: "webdevfinal-1b6d7.firebaseapp.com",
    projectId: "webdevfinal-1b6d7",
    storageBucket: "webdevfinal-1b6d7.appspot.com",
    messagingSenderId: "831425261552",
    appId: "1:831425261552:web:69f0d0e1e7a5193ef57735",
    measurementId: "G-CJPK72JB1N"
};
const app = firebase.initializeApp(config);
const database = db.getDatabase();

const rootRef = db.ref(database);

const newData = {
    email: "john@example.com",
    uid: 123
  };

const newEntryRef = db.push(rootRef, newData);
const newEntryKey = newEntryRef.key;
console.log(`New entry added with key: ${newEntryKey}`);