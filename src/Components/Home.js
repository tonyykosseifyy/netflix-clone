import React from 'react' ;
import Navbar from './Navbar' ;
import './Home.css' ;
import { useLocation } from "react-router-dom";
import requests from "../requests" ;
import Row from "./Row" ;
import Banner from "./Banner";
import styled from "styled-components";
/*
}*/
const useQuery = () => {
  return new URLSearchParams(useLocation().search);
};

const Home = () => {
  const pathname = useLocation() ;
  let query = useQuery() ;
  console.log("pathname =>>" , pathname) ;
  console.log("query =>>" , query.get("search")) ;

  return (
    <div className='home'>
      <Navbar home={true} />
      <Banner url={requests.fetchTrending} />
      <RowsContainer>
        <Row title="Netlfix Originals" url={requests.fetchNetflixOriginals} />
        <Row title="Trending" url={requests.fetchTrending} />
      </RowsContainer>
      {/*<Row title="Top Rated" url={requests.fetchTopRated} />
      <Row title="Action Movies" url={requests.fetchActionMovies} />
      <Row title="Horror Movies" url={requests.fetchHorrorMovies} />*/}
    </div>
  );
};



export default Home ;

const RowsContainer = styled.section`
  margin-top: -150px;
  position: relative ;
  padding-left: 40px;
  z-index: 100 ;
`