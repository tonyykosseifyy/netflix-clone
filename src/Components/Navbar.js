import React  from "react";
import "./Navbar.css";
import styled from "styled-components";
import { NetflixLogo, NetflixButton } from "./components.js";
import Button from "@material-ui/core/Button";
import { useSelector , useDispatch } from "react-redux";
import { signUp , signOut , updateUser } from '../redux/userAuth.js' ;


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
  return (
    <NavContainer className="navbar">
      <NetflixLogo />
      <NetflixButton onClick={() => dispatch(signUp(userTest))}>Sign Up</NetflixButton>
      <NetflixButton onClick={() => dispatch(signOut())}>Sign Out</NetflixButton>
      <NetflixButton onClick={() => dispatch(updateUser({name: 'email' , value: 'kosstony@gmail.com'}))}>Update</NetflixButton>
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
