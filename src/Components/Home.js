import React, { useState , useEffect } from 'react' ;
import Navbar from './Navbar' ;
import './Home.css' ;
import { useLocation } from "react-router-dom";
import requests from "../requests" ;
import Row from "./Row" ;
import Banner from "./Banner";
import styled from "styled-components";
import YouTube from 'react-youtube';
import movieTrailer from 'movie-trailer';
import CloseIcon from "@material-ui/icons/Close";
import IconButton from "@material-ui/core/IconButton";
import { base_url } from "../requests" ;
import StarIcon from "@material-ui/icons/Star" ;
import axios from "../axios" ;
import { API_KEY } from "../requests";

const useQuery = () => {
  return new URLSearchParams(useLocation().search);
};
export const opts = {
  height: "400",
  width: "100%",
  playerVars: {
    autoplay: 1,
  }
}
export const truncate = (str, n) => str?.length > n ? str.substr(0, n - 1) + "..." : str

///movie/asdasda/similar?api_key=API_KEY&language=en-US&page=1 ;

const Home = () => {
  const pathname = useLocation() ;
  let query = useQuery() ;
  const [trailerUrl, setTrailerUrl] = useState("");
  const [ open , setOpen ] = useState(false) ;
  const [ movie , setMovie ] = useState({}) ;
  const [ similarMovies , setSimilarMovies ] = useState([]) ;

  console.log("similar Movies=>" , similarMovies);
  const fetchSimilarMovies = async () => {
    try {
      const response = await axios.get(`/movie/${movie.id}/similar?api_key=${API_KEY}&language=en-US&page=1`);
      setSimilarMovies(response.data.results);
    } catch(err) {
      console.log(err);
      setSimilarMovies([]);
    }
  }
  useEffect(() => {
    if ( movie.id ) {
      fetchSimilarMovies() ;
    }
  },[ movie ])
  const handleClick = (movie) => {
      setMovie(movie);
      setOpen(true);
      movieTrailer(movie?.title || "")
        .then(url => {
          const urlParams = new URLSearchParams(new URL(url).search);
          setTrailerUrl(urlParams.get('v'));
        }).catch((error) => console.log(error));
  }
  const handleClose = () => {
    setMovie({});
    setOpen(false);
    setTrailerUrl("");
    setSimilarMovies([]);
  }
  console.log(movie);
  console.log("true state=> " , (movie.title || movie.original_title))
  return (
    <div className='home'>
      <Navbar home={true} />
      <Banner url={requests.fetchTrending} />
      <RowsContainer>
        <Row title="Netlfix Originals" url={requests.fetchNetflixOriginals} handleClick={handleClick} />
        <Row title="Trending" url={requests.fetchTrending} handleClick={handleClick} />
      </RowsContainer>

      <DetailsContainer open={open} >
        <DetailsChild open={open} className='details-child'>
          <DetailsHeader>
            <IconButton sx={{color:"white"}} >
              <CloseIcon size="medium" onClick={() => handleClose()} />
            </IconButton>
          </DetailsHeader>
          <YoutubeContainer>
              {trailerUrl ? 
                <YouTube videoId={trailerUrl} opts={opts} /> : 
                <img src={`${base_url}${movie.backdrop_path}`} alt={movie?.name} /> 
              }
          </YoutubeContainer>
          
          { movie && 
          <div className='details-description'>
              { (movie.name || movie.original_name) ? 
                    <div className='description-header'>
                        <h1><span>About </span>{movie?.name || movie?.original_name }</h1>
                        <span>{movie?.vote_average}<StarIcon /></span>
                    </div> : null }
              <p>{movie?.overview}</p>
              {movie?.original_name && <span>original name: <strong>{movie?.original_name}</strong></span>}
              {movie?.origin_country && <span>original country: <strong>{movie?.origin_country?.length > 0 ? movie?.origin_country[0] : movie?.origin_country }</strong></span>}
              {movie?.original_language && <span>original language: <strong>{movie?.original_language}</strong></span>}
              {movie?.media_type && <span>media type: <strong>{movie?.media_type}</strong></span>}
              {movie?.first_air_date && <span>first air date: <strong>{movie?.first_air_date}</strong></span>}
          </div>
        }
          { similarMovies.length > 0 && 
          <div className='similar-movies'>
            <h1>Similar Movies</h1>
            <div className="similar-movies-container">
              {similarMovies.map((movie , index) => (
                <div key={movie?.id || index}>
                  <img src={`${base_url}${movie?.backdrop_path}`} alt={movie?.name} />
                  <div className="similar-movies-description">
                    <div style={{display:"flex",justifyContent:"space-between"}}>
                      <h1>{movie?.title || movie?.original_name}</h1>
                      <span>{movie?.vote_average}<StarIcon /></span>
                    </div>
                    <p>{truncate(movie?.overview , 100)}</p>
                  </div>
                </div>))}
            </div>
          </div>}
        </DetailsChild>
      </DetailsContainer>

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

export const DetailsContainer = styled.div`
  z-index: 999999999 ;
  position: fixed ;
  top: 0 ;
  left: 0 ;
  bottom: 0;
  right: ${props => props.open ? "0" : "100%"} ;
  background-color: rgba(0,0,0,.9); 
  transition: .38s ease-out ;
  display: grid ;
  place-items: center;
  transition-delay: ${props => props.open ? "0s" : ".3s"};
`

export const DetailsChild = styled.div`
  border-radius: 10px;
  transition: .3s ease-out ;
  transition-delay: ${props => props.open ? ".3s" : "0s"} ;
  opacity: ${props => props.open ? "1" : "0"};
  background-color: #181818 ;
  // height auto no animation
  height: ${props => props.open ? "100vh" : "0px"};
  max-width: 900px;
  width: 80vw;
  margin-top: 10px;
  overflow-y: scroll ;

  @media (max-width: 600px) {
    width: 100vw ;
  }
`

export const DetailsHeader = styled.div`
  position: relative ;
  padding-top: 55px;

  & > button {
    position: absolute ;
    right: 10px;
    top: 0px;
    color: white ;
  }
  & > button svg {
    font-size: 2.2rem ;
  }

`
export const YoutubeContainer = styled.div`
  width: 100% ;
  position: relative ;
  & > img {
    width: 100% ;
    height: 100% ;
    object-fit: contain ;
  }
  &::before {
    pointer-events: none ;
    content: '' ;
    position: absolute ;
    left: 0 ;
    right: 0 ;
    width: 100%;
    bottom: 0px;
    height: 200px;
    background-image: linear-gradient(to bottom,transparent -10px , #181818 );
  }
`