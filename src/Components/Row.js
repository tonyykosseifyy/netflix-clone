import { useState , useEffect } from "react" ;
import "./Row.css" ;
import axios from "../axios" ;
import { base_url } from "../requests" ;


//movie.poster_path : movie.backdrop_path
const Row = ({ title , url }) => {
    const [ movies , setMovies ] = useState([]);
    const fetchMovies = async () => {
        try {
            const response = await axios.get(url) ;
            setMovies(response.data.results) ;
        } catch(err) {
            console.log(err)
        }
    }
    useEffect(() => {
        fetchMovies() ;
    },[])
    console.log(movies) ;
    return (
        <div className='row'>
            <h1>{title}</h1>
            <div className='row-image'>
                { movies.map((movie , index) => (
                    <img key={movie.id} src={`${base_url}${movie.backdrop_path}`} alt={movie.name} />
                ))}
            </div>
        </div>
    );
};

export default Row ;