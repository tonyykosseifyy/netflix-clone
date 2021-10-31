import { useState , createRef , useEffect } from "react";
import "./Navbar.css";
import styled from "styled-components";
import { NetflixLogo, NetflixButton } from "./components.js";
import { useLocation , Link , useHistory } from "react-router-dom";
import { useSelector } from 'react-redux' ;
import ArrowDropDownIcon from '@material-ui/icons/ArrowDropDown';
import ArrowDropUpIcon from '@material-ui/icons/ArrowDropUp';
import SearchIcon from '@material-ui/icons/Search';

//ctrl-alt-f

const netflixFavicon = "https://occ-0-3312-778.1.nflxso.net/dnm/api/v6/K6hjPJd6cR6FpVELC5Pd6ovHRSk/AAAABUCZYfPbupvQjzSa3egePk8TFNDy2A_w15DEAq50IqW8MYmOtmbWwN4Txem7mgNYEMPJ1BY6uasiIJQ8JeFO3EU.png?r=b97" ;
function useQuery() {
  return new URLSearchParams(useLocation().search);
}

const checkIfActive = (query , value ) => query.get("search") === value ? "active" : "" ;

const Navbar = ({ home , inSearch , searchValue }) => {
  let query = useQuery() ;
  let location = useLocation();
  let history = useHistory() ;
  const signedIn = useSelector(state => state.user.signedIn)
  const photoURL = useSelector(state => state.user.photoURL);
  const [ open , setOpen ] = useState(false) ;
  const [ scroll , setScroll ] = useState(false) ;
  const [ search , setSearch ] = useState(searchValue ? searchValue : "") ;
  const [ openSearch , setOpenSearch ] = useState(inSearch ? true : false) ;
  const [ accountNavbar , setAccountNavbar ] = useState(false) ;
  const searchRef = createRef(null);
  window.addEventListener("scroll" , () => setScroll(window.scrollY)) ;
  useEffect(() => {
    if (searchValue && signedIn ) {
      const array = ["my-list" , "movies" , "recently-added" , "tv-shows"];
        if ( array.some(( item ) => item === searchValue )) {
          setSearch("") ;
          setOpenSearch(false) ;
        } else {
          setSearch(searchValue) ;
          setOpenSearch(true)
          searchRef.current.focus();
        }
    }
  }, [ searchValue ])
  const handleSearch = (e) => {
    setSearch(e.target.value) ;
    if ( location.pathname === "/" ) {
      history.push(`/browse?search=${e.target.value}`) ;
    } else {
      history.push(`/browse?search=${e.target.value}`) ;
    }
  }
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

      { signedIn &&
        <RightNavbar>
          <SearchContainer open={openSearch} > 
          <SearchIcon 
            onClick={() => {
              setOpenSearch(!openSearch) ;
              searchRef.current.focus()
            }} 
          />
            <input 
            ref={searchRef}
            type="text" 
            placeholder="Search movies..." 
            value={search}
            onChange={(e) => handleSearch(e)} 
            onBlur={() => setOpenSearch(false)}
            />
            
          </SearchContainer>

          <AccountNavbar active={accountNavbar} onClick={() => setAccountNavbar(!accountNavbar)}>
            <img src={photoURL ? photoURL : netflixFavicon } alt="User Image" />
            <ArrowDropDownIcon />
            <div>
              <ArrowDropUpIcon />
              <a>Accout</a>
              <a>Help Center</a>
              <a>Sign out of Netflix</a>
            </div>
            
          </AccountNavbar>
        </RightNavbar>
        }
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
const RightNavbar = styled.div`
  margin-left: auto ;
  display: flex ;
  margin-top: -8px;
`

const SearchContainer = styled.div`
  position: relative;
  width: ${props => props.open ? "250px" : "1.1em"} ;
  background-color: ${props => props.open ? "#0C0C0C" : "transparent"};
  border: ${props => props.open ? "1px solid white" : "none"};
  transition: width .3s ease-out;
  padding: 3px ;
  display: flex ;
  & > svg {
    width: 1.1em ;
    height: 1.1em;
  }
  & > input:placeholder {
    font-weight: lighter ;
  }
  & > input {
    margin-left: 7px;
    outline: none ;
    border: none;
    color: white;
    font-weight: 400;
    min-width: 0;
    transition: .3s ease-out ;
    flex: 100 ;
    background: transparent;
  }  
`

const AccountNavbar = styled.div`
  margin-left: 30px;
  display: flex ;
  align-items: center;
  position: relative ;
  cursor: pointer;
  & > svg {
    transition: .3s ease-out;
    transform: ${props => props.active && "rotate(180deg)"};
  }
  & > img {
    width: 1.9em ;
    height: 1.9em;
    object-fit: contain ;
    border-radius: 8px;
  }
  & > div {
    position: absolute;
    top: 50px;
    background-color: rgb(0 0 0 / 80%);
    color: white;
    min-width: 140px;
    font-size: 14px;
    left: -50px;
    padding: 10px 5px;
    transform: ${props => props.active ? "scaleY(1)": "scaleY(0)"} ;
    transform-origin: top;
    transition: transform .2s ease-out;
    overflow: hidden;
    display: flex ;
    flex-direction: column ;
    transition-delay: .3s ;
    border: ${props => props.active ? "1px solid #444445 " : ""}; 
  }
  & > div > a {
    color: white;
    text-decoration: none ;
    text-decoration-color: white ;
    cursor: pointer;
    font-size: 14px;
    padding: 5px 5px ;
  }
  & > div > a:hover {
    text-decoration: underline;
  }
  & > div > svg {
    position: absolute;
    top: -21px;
    font-size: 1.8rem;
    left: 50%;
    transform: translateX(-50%);
  }
`