import firebase from "firebase/app";
import "firebase/auth";


const firebaseConfig = {
    apiKey: "AIzaSyBWJDDnNksUUTNkLk-sF0nn7Bt5Lm0Ju3o",
    authDomain: "netflix-clone-b32fc.firebaseapp.com",
    databaseURL: "https://netflix-clone-b32fc.firebaseio.com",
    projectId: "netflix-clone-b32fc",
    storageBucket: "netflix-clone-b32fc.appspot.com",
    messagingSenderId: "1099341914131",
    appId: "1:1099341914131:web:b33e3267efe5878b83dfe6",
    measurementId: "G-7QQYEHJG47"
};
  // Initialize Firebase
firebase.initializeApp(firebaseConfig);


export { firebase }  ;