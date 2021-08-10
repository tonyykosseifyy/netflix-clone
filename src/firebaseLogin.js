import { firebase } from './firebaseAuth.js' ;
//import { GoogleAuthProvider } from 'firebase/auth' ;

var googleProvider = new firebase.auth.GoogleAuthProvider() ;


export const SignUpProvider = (setData , setProvider) => {
    firebase.auth()
        .signInWithRedirect(googleProvider)
        .then((result) => {
            setData(result)
        }).catch((error) => {
            console.log(error) ;
            alert(error.message) ;
        })  
} ;


export const signInUser = ( email , password , setData, setNewUser) => {
    firebase.auth().signInWithEmailAndPassword(email , password ) 
    .then((response) => {
        console.log('Sign in response',response) ;
        setData(response) ;
    }).catch((error) => {
        alert(error.message + "\n Sign Up instead !") 
        setNewUser(true)
    })
}

export const createUser = (email , password , setData , setNewUser ) => {
    firebase.auth().createUserWithEmailAndPassword(email , password)
    .then((response) => {
        console.log('response',response) ;
        setData(response) ;
    }).catch((error) => {
        alert(error.message + "\n Sign In instead !") ;
        setNewUser(false) ;
    })
} 

