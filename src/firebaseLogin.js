import { firebase } from './firebaseAuth.js' ;
//import { GoogleAuthProvider } from 'firebase/auth' ;


const googleProvider = new firebase.auth.GoogleAuthProvider() ;
const facebookProvider = new firebase.auth.FacebookAuthProvider() ;


let noUserError = "There is no user record corresponding to this identifier. The user may have been deleted." ;
let passwordError = "The password is invalid or the user does not have a password."


export const SignUpProvider = (setData , provider ) => {
  console.log('doing') ;
    firebase.auth()
        .signInWithPopup(provider === "google" ? googleProvider : facebookProvider )
        .then((result) => {
          console.log(result) ;
          setData(result.user) ;
        }).catch((error) => {
            console.log(error.message) ;
            alert(error.message) ;
        })
} ;


export const signInUser = ( email , password , setData, setNewUser) => {
    firebase.auth().signInWithEmailAndPassword(email , password )
    .then((response) => {
        console.log('Sign in response',response.user) ;
        setData(response.user) ;
    }).catch((error) => {
        alert(error.message + ( error.message === passwordError ? "\nReset Password" : error.message === noUserError ? "\nSign Up Instead" : ''))
        console.log(error.message) ;
        error.message === noUserError && setNewUser(true)
    })
}

export const createUser = (email , password , setData , setNewUser ) => {
    firebase.auth().createUserWithEmailAndPassword(email , password)
    .then((response) => {
        console.log('Sign Up response',response.user) ;
        setData(response.user) ;
    }).catch((error) => {
        alert(error.message + (error.message === "The email address is already in use by another account." ? "\nSign In instead !" : '')) ;
        console.log(error.message)
        setNewUser(false) ;
    })
}
