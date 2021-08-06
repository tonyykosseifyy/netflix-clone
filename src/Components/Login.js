import React, { useState , useEffect , useRef } from 'react' ;
import styled from 'styled-components' ;
import Navbar from './Navbar' ;
import { useLocation } from 'react-router-dom';
import { NetflixSign , NetflixButton } from './components' ;
import TextField from '@material-ui/core/TextField' ;
import { useSelector } from 'react-redux' ;
import Fade from 'react-reveal/Fade' ;


{/* let location = useLocation() ;
    console.log(location) ; 
*/}


const Login = () => {
    const emailAddress = useSelector(state => state.user.email) ;

    const passRef = useRef(null) ;
    const [ newUser , setNewUser ] = useState(true) ;
    const [ type , setType ] = useState('password') ;
    const [ email , setEmail ] = useState(emailAddress) ;
    const [ pass , setPass ] = useState('') ;
    const [ emailErr , setEmailErr ] = useState(false) ;

    useEffect(() => {
        if(email === emailAddress ) {
            passRef.current.focus() ;
        }
    },[])
    
    
    useEffect(() => {
        if ( email.trim() ) {
            const emailRegex = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;
            setEmailErr(!emailRegex.test(email)) ;
        } 
    }, [ email ])
    console.log(email , pass , emailErr)
    return (
        <div className='main-page' >
            <Navbar />
            <NetflixSign>
                <h1>Sign { newUser ? 'Up' : 'In'} </h1>
                <form autoComplete='off'>
                    <div style={{position: 'relative', marginBottom: '15px'}} className='netflix-sign-inputs' >
                        <TextField label='Email Address' variant='filled' type='email' name='email' value={email} onChange={(e) => setEmail(e.target.value)} />
                        <Fade when={emailErr} right >
                            <p>Please enter a valid email ! </p>
                        </Fade>
                    </div>
                    
                    <div style={{position: 'relative', marginBottom: '15px'}} className='netflix-sign-inputs' >
                        <TextField ref={passRef} label='Password' variant='filled' type={type} name='password' value={pass} onChange={(e) => setPass(e.target.value)} />
                        <span onClick={() => setType((prev) => prev === 'password' ? 'text' : 'password')}>{type === 'password' ? 'show' : 'hide' }</span>
                        <Fade when={pass.length < 8 && pass.trim() } right >
                            <p>Password must contain at least 8 characters </p>
                        </Fade>
                    </div>
                    
                    <NetflixButton disabled={emailErr || pass.length < 8 } className={`netflix-button-login ${emailErr || (pass.length < 8) ? '' : 'netflix-button-login-hover'}`} styles={{padding: '12px 25px'}} >Sign {newUser ? 'Up' : 'In'}</NetflixButton>
                </form>
                <p>{ newUser ? 'Have an Account?' : 'New to Netflix?' } <strong onClick={() => setNewUser((prev) => !prev)} >Sign { newUser ? 'In' : 'Up'} Now</strong></p>
            </NetflixSign>
        </div>
    ) ;
} ;

export default Login ;
