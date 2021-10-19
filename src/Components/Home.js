import React from 'react' ;
import Navbar from './Navbar' ;
import './Home.css' ;
import { useLocation } from "react-router-dom";




const Home = () => {
  const pathname = useLocation() ;
  console.log("pathname =>>" , pathname) ;
  return (
    <div className='home'>
      <Navbar home={true} />
    </div>
  ) ;
} ;



export default Home ;
