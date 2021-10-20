import { useState } from "react";
import "./Navbar.css";
import styled from "styled-components";
import { NetflixLogo, NetflixButton } from "./components.js";
import { useLocation , Link } from "react-router-dom";
import { useSelector } from 'react-redux' ;
import ArrowDropDownIcon from '@material-ui/icons/ArrowDropDown';
import ArrowDropUpIcon from '@material-ui/icons/ArrowDropUp';
{
  /* let location = useLocation() ;
    console.log(location) ;
*/
}
//ctrl-alt-f
function useQuery() {
  return new URLSearchParams(useLocation().search);
}

const checkIfActive = (query , value ) => query.get("search") === value ? "active" : "" ;

const Navbar = ({ home }) => {
  let query = useQuery() ;
  let location = useLocation();
  const signedIn = useSelector(state => state.user.signedIn)
  const [ open , setOpen ] = useState(false) ;
  const [ scroll , setScroll ] = useState(false) ;
  window.addEventListener("scroll" , () => setScroll(window.scrollY)) ;

  return (
    <NavContainer className="navbar" home={home} scroll={scroll} >
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

      {signedIn &&
        <BrowseContainer 
          className='browse'
          onClick={() => setOpen(!open)}
        >
          Browse
          <ArrowDropDownIcon />
        </BrowseContainer>
      }
      

      <div 
        className={`navbar-link-container ${open && 'open'}`} 
        style={{
          display: signedIn ? "flex" : "none", 
          transition: open ? ".3s cubic-bezier(0.18, 0.89, 0.32, 1.28)":".1s ease-out",
        }}
          >
        <div className='arrow-carrout'></div>
        <Link onClick={() => setOpen(false)} className={checkIfActive(query,null)} to="/">Home</Link>
        <Link onClick={() => setOpen(false)} className={checkIfActive(query,"tv-shows")} to="/browse?search=tv-shows">TV Shows</Link>
        <Link onClick={() => setOpen(false)} className={checkIfActive(query,"movies")} to="/browse?search=movies">Movies</Link>
        <Link onClick={() => setOpen(false)} className={checkIfActive(query,"recently-added")} to="/browse?search=recently-added">Recently Added</Link>
        <Link onClick={() => setOpen(false)} className={checkIfActive(query,"my-list")} to="/browse?search=my-list">My List</Link>
      </div>

    </NavContainer>
  );
};

export default Navbar;

const NavContainer = styled.nav`
  z-index: 100000 ;
  height: 120px;
  padding: 25px 4.3vw;
  display: flex;
  justify-content: ${props => props.home ? "" : "space-between"} ;
  align-items: center;
  position: ${props => props.scroll > 70 ? "sticky" : "relative"} ;
  top: 0 ;
  left: 0 ;
  right: 0 ;
  background-color: ${props => props.scroll > 70 ? "black" : "transparent"};
  transition: .5s ease-in-out ;
`;

const BrowseContainer = styled.div`
  align-items: center;
  display: none ;
  margin-left: 20px;
  & > a {
    text-decoration: none;
    color: white ;
    font-weight: bold ;
    padding: 5px;
  }
  & > svg {
    font-size: 2rem !important ;
    margin-left: -4px;
  }
  @media (max-width:800px) {
    display: flex;
  }
`
