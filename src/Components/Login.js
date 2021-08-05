import React from 'react' ;
import styled from 'styled-components' ;
import Navbar from './Navbar' ;
import { useLocation } from 'react-router-dom';


const Login = () => {
    let location = useLocation() ;
    console.log(location) ;
    return (
        <div className='main-page' >
            <Navbar />
        </div>
    ) ;
} ;

export default Login ;
