import { firebase } from './firebaseAuth.js' ;



export const SignUpProvider = (provider) => {
    firebase.auth()
        .signInWithRedirect(provider)
        .then((result) => {
            return result ;
        }).catch((error) => {
            return error 
        })  
} ;


export const signInUser = ( email , password , setData, setNewUser) => {
    firebase.auth().signInWithEmailAndPassword(email , password ) 
    .then((response) => {
        console.log(response)
    }).catch((error) => {
        console.log(error) 
    })
}

export const createUser = (email , password , setData , setNewUser ) => {
    firebase.auth().createUserWithEmailAndPassword(email , password)
    .then((response) => {
        console.log(response)
    }).catch((error) => {
        console.log(error)
    })
} 

