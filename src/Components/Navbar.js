import React, { useEffect }  from "react";
import "./Navbar.css";
import styled from "styled-components";
import { NetflixLogo, NetflixButton } from "./components.js";
import Button from "@material-ui/core/Button";
import { useSelector , useDispatch } from "react-redux";
import { signUp , signOut , updateUser } from '../redux/userAuth.js' ;
import { firebase } from '../firebaseAuth' ;

//ctrl-alt-f

const Navbar = () => {
  const user = useSelector(state => state.user) ;
  console.log('user => ' , user )
  const dispatch = useDispatch() ;
  const userTest = {
    name :'tony' ,
    email: 'tonykosseify123@gmail.com' ,
    photoURL : 'https://image.com' ,
  }
  const firebaseSign = () => {
    firebase.auth().createUserWithEmailAndPassword('tonykosseify123@gmail.com', '123tong321123')
      .then((userCredential) => {
        const user = userCredential.user;
        console.log('firebase user' , user) ;
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log('firebase err', errorCode , errorMessage ) ;
      });
  }
  useEffect(() => {
    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        // User is signed in, see docs for a list of available properties
        // https://firebase.google.com/docs/reference/js/firebase.User
        var uid = user.uid;
        // ...
      } else {
        // User is signed out
        // ...
      }
    });
  },[])
  return (
    <NavContainer className="navbar">
      <NetflixLogo />
      <NetflixButton onClick={() => dispatch(signUp(userTest))}>Sign Up</NetflixButton>
    </NavContainer>
  );
};

export default Navbar;


const NavContainer = styled.nav`
  height: 120px ;
  padding: 25px 4.3vw;
  display: flex;
  justify-content: space-between;
  align-items: center;
  position: relative;
  & > svg {
    width: 10vw;
    height: 50px;
    object-fit: contain;
    fill: var(--netflix-red);
    max-width: 180px;
    min-width: 100px;
  }
`;
