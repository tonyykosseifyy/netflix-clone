import { useState , useEffect } from "react";
import axios from "../axios" ;

const Banner = ({ url }) => {
    const [ movie , setMovie ] = useState() ; 
    const fetchOriginals = async () => {
        try {   
            const response = await axios.get(url);
            setMovie(response.data.results);
        } catch(err) {
            console.log(err)
        }
    }
    useEffect(() => {
        fetchOriginals();
    }, [])
    console.log(movie) ;
    return (
        <div>

        </div>
    );
};


export default Banner ;