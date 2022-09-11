// import { initializeApp } from 'firebase/app';
// import { getFirestore } from 'firebase/firestore';
// //import { getAuth, onAuthStateChanged } from "firebase/auth";
// //import * as firebase from "firebase";

// const auth = firebase.auth()

// // Your web app's Firebase configuration
// const firebaseConfig = {
//     apiKey: "AIzaSyDsvPYz_UF8jYHz8VqWl8NWP1te15jGH0k",
//     authDomain: "maracana-699c7.firebaseapp.com",
//     projectId: "maracana-699c7",
//     storageBucket: "maracana-699c7.appspot.com",
//     messagingSenderId: "918389633017",
//     appId: "1:918389633017:web:d6b2402786a29207b05728"
//   };
//   // Initialize Firebase
// let app;
// if (firebase.apps.length === 0) {
//   app = firebase.initializeApp(firebaseConfig);
// } else {
//   app = firebase.app()
// }
// const firestore = getFirestore(app);

// export {firestore, auth}
// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDsvPYz_UF8jYHz8VqWl8NWP1te15jGH0k",
    authDomain: "maracana-699c7.firebaseapp.com",
    projectId: "maracana-699c7",
    storageBucket: "maracana-699c7.appspot.com",
    messagingSenderId: "918389633017",
    appId: "1:918389633017:web:d6b2402786a29207b05728"
};

// Initialize Firebase
const firebaseApp = initializeApp(firebaseConfig);
export default firebaseApp;