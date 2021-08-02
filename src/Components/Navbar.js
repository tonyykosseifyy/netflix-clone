import React from "react";
import "./Navbar.css";
import styled from "styled-components";
import { NetflixLogo , NetflixButton } from "./components.js";

//ctrl-alt-f

const Navbar = () => {
  return (
    <NavContainer className="navbar">
      <NetflixLogo />
      <NetflixButton>Sign Up</NetflixButton>
    </NavContainer>
  );
};

export default Navbar;

const NavContainer = styled.nav`
  background: red;
  min-height: 40px;
  padding: 25px 4.5vw ;
  display: flex;
  justify-content: space-between;
  align-items: center;
  & > svg {
    width: 140px;
    height: 45px;
    object-fit: contain;
    fill: currentColor ;
  }
`;
