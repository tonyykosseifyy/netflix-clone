import { useState , useEffect } from "react" ;
import styled from "styled-components";
import Navbar from "./Navbar";
import { useLocation } from "react-router-dom";
import axios from "../axios" ;
import { API_KEY , base_url } from "../requests";
import { DetailsContainer , DetailsChild ,YoutubeContainer , DetailsHeader , opts } from "./Home" ;
import YouTube from 'react-youtube';
import movieTrailer from 'movie-trailer';
import CloseIcon from "@material-ui/icons/Close";
import IconButton from "@material-ui/core/IconButton";
import StarIcon from "@material-ui/icons/Star" ;

const useQuery = () => new URLSearchParams(useLocation().search);


const array = ["my-list" , "movies" , "recently-added" , "tv-shows"];

const requests = {
    fetchTvShows: `/genre/tv/list?api_key=${API_KEY}&language=en-US`, 
    fetchTrending : `/trending/movie/week?api_key=${API_KEY}`,
    fetchTopRated: `/movie/top_rated?api_key=${API_KEY}&language=en-US`
};

const SearchResults = () => {
    let query = useQuery() ;
    let location = useLocation() ;
    const [ search , setSearch ] = useState("") ;
    const [ searchResults , setSearchResults ] = useState([]) ;
    const [ open , setOpen ] = useState(false) ;
    const [trailerUrl, setTrailerUrl] = useState("");
    const [ movie , setMovie ] = useState({}) ;
    useEffect(() => {
        setSearch(query.get("search"));
    }, [ location.search ])
    console.log(location , search )

    const SearchMovie = async () => {
        try {
            const response = await axios.get(`/search/movie?api_key=${API_KEY}&language=en-US&query=${search}&page=1`)
            setSearchResults(response.data.results) ; 
        } catch(err) {
            console.log(err);
            setSearchResults([]) ;
        }
    }
    const fetchMovies = async ( url ) => {
        try {
            const response = await axios.get(url)
            setSearchResults(response.data.results) ;
            console.log(response);
        } catch(err) {
            setSearchResults([])
            console.log(err);
        }
    }
    useEffect(() => {
        if ( array.some(( item ) => item === search )) {
            search === "tv-shows" ? fetchMovies(requests.fetchTvShows):search === "recently-added"? fetchMovies(requests.fetchTrending) : search === "movies" && fetchMovies(requests.fetchTopRated) ;
            console.log("first")
        } else SearchMovie() ;
    }, [ search ])

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
      }
    console.log(movie) ;
    console.log("true state=> " , (movie?.title) && "true" )
    return (
        <SearchWrapper className='home'>
            <Navbar home inSearch searchValue={search} handleInputSearch={setSearch} />
            { searchResults?.length > 0 && <SearchHeader>Results For " <strong>{search.replace("-"," ")}</strong> "</SearchHeader>}
            <SearchContainer>
                { searchResults?.length > 0 ? searchResults.map((movie , index) => (
                    <img 
                        key={movie.id || index } 
                        src={`${base_url}${movie.backdrop_path}`} 
                        alt={movie.name} 
                        style={{display : !movie.backdrop_path && "none"}}
                        onClick={() => handleClick(movie)}
                    />
                )) 
                : 
                <p style={{fontWeight:"300"}}>No Results Found for <strong>{search.replace("-"," ")}</strong></p>}
            </SearchContainer>

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
                    { (movie?.title || movie?.original_title) ? 
                    <div className='description-header'>
                        <h1><span>About </span>{movie?.title || movie?.original_title }</h1>
                        <span>{movie?.vote_average}<StarIcon /></span>
                    </div> : null }
                    <p>{movie?.overview}</p>
                    {movie?.original_title && <span>original title: <strong>{movie?.original_title}</strong></span>}
                    {movie?.origin_country && <span>original country: <strong>{movie?.origin_country?.length > 0 ? movie?.origin_country[0] : movie?.origin_country }</strong></span>}
                    {movie?.original_language && <span>original language: <strong>{movie?.original_language}</strong></span>}
                    {movie?.media_type && <span>media type: <strong>{movie?.media_type}</strong></span>}
                    {movie?.first_air_date && <span>first air date: <strong>{movie?.first_air_date}</strong></span>}
                </div>
                }
                </DetailsChild>
            </DetailsContainer>
        </SearchWrapper>
    );
};

export default SearchResults ;



const SearchWrapper = styled.main``


const SearchContainer = styled.section`
    margin: 0 auto ;
    padding: 20px;
    display: grid ;
    grid-template-columns: repeat(4 , 1fr );
    grid-column-gap: 5px ;
    grid-row-gap: 70px ;
    width: 100% ;
    max-width: 1200px ;
    @media (max-width: 800px) {
        grid-template-columns: repeat(3 , 1fr);
        grid-row-gap: 60px ;
    }
    @media (max-width: 400px) {
        grid-template-columns: repeat(2 ,1fr);
        grid-row-gap: 40px ;
    }
    & > img {
        height: 100% ;
        width: 100% ;
        object-fit: cover;
        transition: .3s ease-out;
        cursor: pointer;
    }
    & > img:hover {
        transform: scale(1.07);
    }
`

const SearchHeader = styled.h1`
    font-weight: 300;
    font-size: 1rem;
    margin-top: 50px;
    margin-left: 20px;
    text-transform: capitalize;
`