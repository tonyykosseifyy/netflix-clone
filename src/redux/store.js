import { configureStore } from '@reduxjs/toolkit' ;
import user from './userAuth.js' ;


export default configureStore({
    reducer: {
        user : user 
    }
}) ;