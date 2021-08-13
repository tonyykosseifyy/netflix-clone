import { firebase } from './firebaseAuth.js' ;
//import { GoogleAuthProvider } from 'firebase/auth' ;


const googleProvider = new firebase.auth.GoogleAuthProvider() ;
const facebookProvider = new firebase.auth.FacebookAuthProvider() ;


export const noUserError = "There is no user record corresponding to this identifier. The user may have been deleted." ;
export const passwordError = "The password is invalid or the user does not have a password."
export const alreadyInUse = "The email address is already in use by another account."

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


export const signInUser = ( email , password , setData, setNewUser , setMessage , setOpen ) => {
    firebase.auth().signInWithEmailAndPassword(email , password )
    .then((response) => {
        console.log('Sign in response',response.user) ;
        setData(response.user) ;
    }).catch((error) => {
        setOpen(true)
        setMessage(error.message)
        error.message === noUserError && setNewUser(true)
    })
}

export const createUser = (email , password , setData , setNewUser , setMessage , setOpen ) => {
    firebase.auth().createUserWithEmailAndPassword(email , password)
    .then((response) => {
        console.log('Sign Up response',response.user) ;
        setData(response.user) ;
    }).catch((error) => {
        setOpen(true)
        setMessage(error.message)
        setNewUser(false) ;
        console.log(error.message)
    })
}


export const resetPassword = (email , setMessage , setOpen ) => {
  firebase.auth().sendPasswordResetEmail(email)
  .then((response) => {
    console.log("success: " , response)
  }).catch((error) => {
    setOpen(true)
    setMessage(error.message)
  })
}
