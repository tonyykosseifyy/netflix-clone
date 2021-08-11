import React, { useState, useEffect, useRef } from "react";
import Navbar from "./Navbar";
import { NetflixSign, NetflixButton } from "./components";
import TextField from "@material-ui/core/TextField";
import { useSelector , useDispatch } from "react-redux";
import Fade from "react-reveal/Fade";
import { createUser, signInUser, SignUpProvider , firebaseSignOut} from "../firebaseLogin";
import { useHistory } from 'react-router-dom' ;
import { signOut } from '../redux/userAuth' ;
import { firebase } from '../firebaseAuth' ;


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
    if (email) {
      passRef.current.focus();
    }
  }, []);
  const handleSubmit = () => {
    console.log("submitting");
    if (!emailErr && pass.length > 8) {
      if (newUser) {
        createUser(email, pass, setData, setNewUser);
      } else {
        signInUser(email, pass, setData, setNewUser);
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
  return (
    <div className="main-page">
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
          <NetflixButton onClick={() => SignUpProvider(setData, setProvider)}>
            Sign in with Google
          </NetflixButton>
        </NetflixSign>
        :
        <NetflixSign>
          <h1>You are already Signed in {state.displayName !== null ? state.displayName : ''} !</h1>
            <NetflixButton
              onClick={() => firebaseSignOut()}
              className='netflix-button-login netflix-button-login-hover'
              styles={{ padding: "12px 25px" }}
            >
              Sign Out
            </NetflixButton>
      </NetflixSign>
       }

    </div>
  );
};

export default Login;
