import React  from "react";
import "./Navbar.css";
import styled from "styled-components";
import { NetflixLogo, NetflixButton } from "./components.js";
import Button from "@material-ui/core/Button";



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
