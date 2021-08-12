import React from 'react' ;
import Navbar from './Navbar' ;
import './Home.css' ;


const Home = () => {
  return (
    <div className='home'>
      <Navbar home={true} />
    </div>
  ) ;
} ;



export default Home ;
