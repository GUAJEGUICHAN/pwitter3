// Import the functions you need from the SDKs you need
import * as firebase from "firebase/app";
import * as auth from "firebase/auth"
import * as firestore from "firebase/firestore"
import * as storage from "firebase/storage"

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyDr9U6QU_LlSwmsNjvfY4xgolctgBY59uU",
    authDomain: "nwitter-42dcd.firebaseapp.com",
    projectId: "nwitter-42dcd",
    storageBucket: "nwitter-42dcd.appspot.com",
    messagingSenderId: "478711380670",
    appId: "1:478711380670:web:2b040e8f9e2dc59fe0bcef"
};
firebase.initializeApp(firebaseConfig)
export const authService = auth
export const dbService = firestore
export const storageService = storage;
// Initialize Firebase
