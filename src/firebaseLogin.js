import { firebase } from './firebaseAuth.js' ;
//import { GoogleAuthProvider } from 'firebase/auth' ;


const googleProvider = new firebase.auth.GoogleAuthProvider() ;
const facebookProvider = new firebase.auth.FacebookAuthProvider() ;




export const SignUpProvider = (setData , setProvider) => {
  console.log('doing') ;
    firebase.auth()
        .signInWithPopup(googleProvider)
        .then((result) => {
          console.log(result) ;
          setData(result.user) ;
        }).catch((error) => {
            console.log(error) ;
            alert(error.message) ;
        })
} ;


export const signInUser = ( email , password , setData, setNewUser) => {
    firebase.auth().signInWithEmailAndPassword(email , password )
    .then((response) => {
        console.log('Sign in response',response.user) ;
        setData(response.user) ;
    }).catch((error) => {
        alert(error.message + "\n Sign Up instead !")
        setNewUser(true)
    })
}

export const createUser = (email , password , setData , setNewUser ) => {
    firebase.auth().createUserWithEmailAndPassword(email , password)
    .then((response) => {
        console.log('Sign Up response',response.user) ;
        setData(response.user) ;
    }).catch((error) => {
        alert(error.message + "\n Sign In instead !") ;
        setNewUser(false) ;
    })
}
