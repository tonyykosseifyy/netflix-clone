import React, { useState, useEffect, useRef } from "react";
import Navbar from "./Navbar";
import { NetflixSign, NetflixButton } from "./components";
import TextField from "@material-ui/core/TextField";
import { useSelector , useDispatch } from "react-redux";
import Fade from "react-reveal/Fade";
import { createUser, signInUser, SignUpProvider , firebaseSignOut , resetPassword, alreadyInUse ,passwordError, noUserError } from "../firebaseLogin";
import { useHistory , Link } from 'react-router-dom' ;
import { signOut } from '../redux/userAuth' ;
import { firebase } from '../firebaseAuth' ;
import './Login.css' ;
import { FcGoogle } from 'react-icons/fc' ;
import { GrFacebook } from 'react-icons/gr' ;
import { AiOutlineArrowLeft } from 'react-icons/ai' ;
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';
import Slide from '@material-ui/core/Slide';
import Button from '@material-ui/core/Button' ;


function SlideTransition(props) {
  return <Slide {...props} direction="down" />;
}
const AlertButton = (props) => {
  return (
      <Button
        style={{color: 'white', display: props.children === "" ? "none" : "" , borderColor: "white" , fontSize:"0.74rem"}}
        variant="outlined"
        size="small"
        onClick={(props.errorMessage === passwordError ) ? props.func : props.setOpen }
        >
        {props.children}
      </Button>
  )
}


const Login = () => {
  const emailAddress = useSelector((state) => state.user.email);
  let history = useHistory() ;
  const state = useSelector((state) => state.user) ;
  const dispatch = useDispatch() ;

  const [newUser, setNewUser] = useState(true);
  const [type, setType] = useState("password");
  const [email, setEmail] = useState(emailAddress);
  const [pass, setPass] = useState("");
  const [emailErr, setEmailErr] = useState(false);
  const [data, setData] = useState({});
  const [provider, setProvider] = useState(false);

  const [ open , setOpen ] = useState(false) ;
  const [ errorMessage , setErrorMessage ] = useState('') ;
  const [ severity , setSeverity ] = useState('error') ;
  const [ signedOutSuccess , setSignedOutSuccess ] = useState(false) ;

  const firebaseSignOut = () => {
    firebase.auth().signOut().then(() => {
      dispatch(signOut())
    }).catch((error) => {
      console.log(error) ;
      alert(error.message)
    })
  }

  useEffect(() => {
    if ( data.hasOwnProperty('displayName') ) {
      history.push('/') ;
    }
  }, [ data ])
  let passRef = useRef();
  useEffect(() => {
    if (email && !state.signedIn) {
      passRef.current.focus();
    }
  }, []);
  const handleSubmit = () => {
    console.log("submitting");
    if (!emailErr && pass.length > 8) {
      if (newUser) {
        createUser(email, pass, setData, setNewUser , setErrorMessage ,setOpen);
      } else {
        signInUser(email, pass, setData, setNewUser , setErrorMessage ,setOpen );
      }
    }
  };
  console.log("data", data);
  useEffect(() => {
    if (email.trim()) {
      const emailRegex = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;
      setEmailErr(!emailRegex.test(email));
    }
  }, [email]);
  console.log(email, pass, emailErr);
  useEffect(() => {
    if ( errorMessage === "A password reset email has been sent to you. Please check your email inbox to reset your password.") {
      setSeverity("info") ;
    } else {
      setSeverity('error')
    }
  }, [ errorMessage ])
  const resetPasswordFunction = () => {
    setOpen(true) ;
    resetPassword(email, setErrorMessage , setOpen) ;
    setErrorMessage("A password reset email has been sent to you. Please check your email inbox to reset your password.")
  }
  return (
    <div className="main-page" style={{minHeight: "100vh" , height: "auto"}} >

      <Snackbar TransitionComponent={SlideTransition} anchorOrigin={{ vertical: "top", horizontal:"center" }} open={open}  onClose={() => setOpen(false)}>
        <MuiAlert elevation={6} variant="filled" onClose={() => setOpen(false)} severity={severity} >
          {errorMessage}
          <AlertButton func={() => resetPasswordFunction()} setOpen={() => setOpen(false)} errorMessage={errorMessage} >
            {( errorMessage === passwordError ? "Reset Password"
            : errorMessage === noUserError ? "Sign Up Instead" : errorMessage === alreadyInUse ? 'Sign in Instead' : '')}
          </AlertButton>

        </MuiAlert>
      </Snackbar>

      <div className='login-overlay'></div>
      <Navbar />
      { !state.signedIn ?
        <NetflixSign>
          <h1>Sign {newUser ? "Up" : "In"} </h1>
          <form autoComplete="off" onSubmit={() => handleSubmit()}>
            <div
              style={{ position: "relative", marginBottom: "15px" }}
              className="netflix-sign-inputs"
            >
              <TextField
                required
                label="Email Address"
                variant="filled"
                type="email"
                name="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <Fade when={emailErr} right>
                <p>Please enter a valid email ! </p>
              </Fade>
            </div>

            <div
              style={{ position: "relative", marginBottom: "15px" }}
              className="netflix-sign-inputs"
            >
              <TextField
                required
                inputRef={passRef}
                label="Password"
                variant="filled"
                type={type}
                name="password"
                value={pass}
                onChange={(e) => setPass(e.target.value)}
              />
              <span
                onClick={() =>
                  setType((prev) => (prev === "password" ? "text" : "password"))
                }
              >
                {type === "password" ? "show" : "hide"}
              </span>
              <Fade when={pass.length < 8 && pass.trim()} right>
                <p>Password must contain at least 8 characters </p>
              </Fade>
            </div>

            <NetflixButton
              onClick={() => handleSubmit()}
              type="submit"
              disabled={emailErr || pass.length < 8}
              className={`netflix-button-login ${
                emailErr || pass.length < 8 ? "" : "netflix-button-login-hover"
              }`}
              styles={{ padding: "12px 25px" }}
            >
              Sign {newUser ? "Up" : "In"}
            </NetflixButton>
          </form>
          <p>
            {newUser ? "Have an Account?" : "New to Netflix?"}{" "}
            <strong onClick={() => setNewUser((prev) => !prev)}>
              Sign {newUser ? "In" : "Up"} Now
            </strong>
          </p>
          <div className='social-media-login-container'>
            <button className='social-media-login' onClick={() => SignUpProvider(setData, "google")}>
              <FcGoogle /> Login in with Google
            </button>
            <button className='social-media-login' onClick={() => SignUpProvider(setData, "facebook")}>
              <GrFacebook /> Login in with Facebook
            </button>
          </div>
        </NetflixSign>
        :
        <NetflixSign>
          <h1>You are already Signed in {state.displayName !== null ? state.displayName : ''} !</h1>
            <NetflixButton
              onClick={() => firebaseSignOut()}
              className='netflix-button-login netflix-button-login-hover'
              styles={{ padding: "15px 25px" }}
            >
              Sign Out
            </NetflixButton>
            <Link className='go-home-link' to='/'>
              <AiOutlineArrowLeft />
              Go Back Home
            </Link>
      </NetflixSign>
       }

    </div>
  );
};

export default Login;
