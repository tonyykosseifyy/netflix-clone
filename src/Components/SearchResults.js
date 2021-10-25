import { useState , useEffect } from "react" ;
import styled from "styled-components";
import Navbar from "./Navbar";
import { useLocation } from "react-router-dom";
import axios from "../axios" ;
import { API_KEY , base_url } from "../requests";


const useQuery = () => new URLSearchParams(useLocation().search);


const array = ["my-list" , "movies" , "recently-added" , "tv-shows"];

const requests = {
    fetchTvShows: `https://api.themoviedb.org/3/genre/tv/list?api_key=${API_KEY}&language=en-US`, 
    fetchTrending : `https://api.themoviedb.org/3/trending/movie/week?api_key=${API_KEY}`,
    fetchTopRated: `/movie/top_rated?api_key=${API_KEY}&language=en-US`
};

const SearchResults = () => {
    let query = useQuery() ;
    let location = useLocation() ;
    const [ search , setSearch ] = useState("") ;
    const [ searchResults , setSearchResults ] = useState([]) ;
    
    useEffect(() => {
        setSearch(query.get("search"));
    }, [ location.search ])
    console.log(location , search )

    const SearchMovie = async () => {
        try {
            const response = await axios.get(`/search/movie?api_key=${API_KEY}&language=en-US&query=${search}&page=1`)
            setSearchResults(response.data.results) ; 
        } catch(err) {
            setSearchResults([]) ;
        }
    }
    const fetchMovies = async( url ) => {
        try {
            const response = await axios.get(url)
            setSearchResults(response.data.results) ;
            console.log(response);
        } catch(err) {setSearchResults([])}
    }
    useEffect(() => {
        if ( array.some(( item ) => item === search )) {
            search === "tv-shows" ? fetchMovies(requests.fetchTvShows):search === "recently-added"? fetchMovies(requests.fetchTrending) : search === "movies" && fetchMovies(requests.fetchTopRated) ;
        } else SearchMovie() ;
    }, [ search ])
    console.log(searchResults) ;
    return (
        <SearchWrapper className='home'>
            <Navbar home inSearch searchValue={search} handleInputSearch={setSearch} />
            { searchResults.length > 0 && <SearchHeader>Results For " <strong>{search.replace("-"," ")}</strong> "</SearchHeader>}
            <SearchContainer>
                { searchResults.length > 0 ? searchResults.map((movie , index) => (
                    <img 
                        key={movie.id || index } 
                        src={`${base_url}${movie.backdrop_path}`} 
                        alt={movie.name} 
                        style={{display : !movie.backdrop_path && "none"}}
                    />
                )) 
                : 
                <p style={{fontWeight:"300"}}>No Results Found for <strong>{search.replace("-"," ")}</strong></p>}
            </SearchContainer>
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