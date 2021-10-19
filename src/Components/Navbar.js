import React from "react";
import "./Navbar.css";
import styled from "styled-components";
import { NetflixLogo, NetflixButton } from "./components.js";
import { useLocation , Link } from "react-router-dom";
import { useSelector } from 'react-redux' ;

{
  /* let location = useLocation() ;
    console.log(location) ;
*/
}
//ctrl-alt-f
function useQuery() {
  return new URLSearchParams(useLocation().search);
}

const checkIfActive = (query , value ) => {
  if( query.get("search") === value ) {
    return "active"
  } else return ""
}

const Navbar = ({ home }) => {
  let query = useQuery() ;
  let location = useLocation();
  const signedIn = useSelector(state => state.user.signedIn)

  return (
    <NavContainer className="navbar" home={home}>
      <Link to="/" className='no-styling-link' >
        <NetflixLogo />
      </Link>

      <Link to='/login' className='no-styling-link' style={{display: home ? "none" : ""}}>
        <NetflixButton
          style={{ display: location?.pathname === "/login" ? "none" : "" }}
        >
          Sign Up
        </NetflixButton>
      </Link>

      <div className="navbar-link-container" style={{display: signedIn ? "" : "none"}}>
        <Link to="/">Home</Link>
        <Link to="/search?tv-shows">TV Shows</Link>
        <Link to="/browse?search=movies">Movies</Link>
        <Link to="/browse?search=recently-added">Recently Added</Link>
        <Link to="/browse?search=my-list">My List</Link>
      </div>


    </NavContainer>
  );
};

export default Navbar;

const NavContainer = styled.nav`
  height: 120px;
  padding: 25px 4.3vw;
  display: flex;
  justify-content: ${props => props.home ? "" : "space-between"} ;
  align-items: center;
  position: relative;
`;
