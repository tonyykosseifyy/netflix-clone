import { createSlice } from '@reduxjs/toolkit' ;


export const user = createSlice({
    name: 'userCredentials' ,
    initialState: {
        name: '' ,
        email: '' ,
        photoURL : '', 
        signedIn : false 
    },
    reducers: {
        signUp : (state , action ) => {
            const { name , email , photoURL } = action.payload ;
            state.name = name ;
            state.email = email ;
            state.photoURL = photoURL ;
            state.signedIn = true
        } , 
        signOut : (state) => {
            state.name ='' ;
            state.email = '';
            state.photoURL = '';
            state.signedIn = false
        } ,
        updateUser : (state , action ) => {
            const { name , value } = action.payload ;
            state[name] = value ;
        }
    }
}) ;

export const { signUp , signOut , updateUser } = user.actions ;
export default user.reducer ; 