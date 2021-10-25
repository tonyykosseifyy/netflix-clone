import { useState , useEffect } from "react" ;
import styled from "styled-components";
import Navbar from "./Navbar";
import { useLocation } from "react-router-dom";
import axios from "../axios" ;
import { API_KEY , base_url } from "../requests";

const useQuery = () => new URLSearchParams(useLocation().search);

const checkIfActive = (query , value ) => query.get("search") === value ? "active" : "" ;

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
    useEffect(() => {
        SearchMovie() ;
    }, [ search ])
    console.log(searchResults) ;
    return (
        <SearchWrapper className='home'>
            <Navbar home inSearch searchValue={search} handleInputSearch={setSearch} />
            <SearchContainer>
                { searchResults.length > 0 ? searchResults.map((movie , index) => (
                    <img key={movie.id || index } src={`${base_url}${movie.backdrop_path}`} alt={movie.name} />
                )) 
                : 
                <p>No Results Found for <strong>{search}</strong></p>}
            </SearchContainer>
        </SearchWrapper>
    );
};

export default SearchResults ;



const SearchWrapper = styled.main``


const SearchContainer = styled.section`
    margin-top: 30px;
    padding: 30px 20px;
    display: grid ;
    grid-template-columns: repeat(4 , 1fr);
    grid-column-gap: 5px ;
    grid-row-gap: 100px ;

    & > img {
        height: 100% ;
        width: 100% ;
        object-fit: contain ;
    }
`