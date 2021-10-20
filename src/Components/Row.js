import { useState , useEffect } from "react" ;
import "./Row.css" ;
import axios from "../axios" ;
import { base_url } from "../requests" ;
import { Swiper, SwiperSlide } from "swiper/react";
import SwiperCore, { Navigation } from 'swiper';

// Import Swiper styles
//npm install swiper@6.8.4
import 'swiper/swiper-bundle.min.css'
import 'swiper/swiper.min.css'

SwiperCore.use([Navigation]);

//movie.poster_path : movie.backdrop_path
const Row = ({ title , url }) => {
    const [ movies , setMovies ] = useState([]);
    const [ width , setWidth ] = useState(window.innerWidth) ;

    const slidesFunction = () => {
        if ( width > 1024 ) {
            return (width - 40) / 235
        } else if (width > 700 ) {
            return (width - 40) / 180
        } else if (width > 500 ) {
            return (width - 40) / 144
        } else return (width - 40) / 108
    }
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
    window.addEventListener("resize" , () => setWidth(window.innerWidth)) ;
    return (
        <div className='row'>
            <h1>{title}</h1>
            <Swiper 
                slidesPerView={slidesFunction()}
                spaceBetween={5} 
                freeMode={true} 
                navigation={{"clickable": true}}
                navigation 
                className="mySwiper row-image"
            >
                { movies.map((movie , index) => (
                    <SwiperSlide key={movie.id}>
                        <img src={`${base_url}${movie.backdrop_path}`} alt={movie.name} />
                    </SwiperSlide>
                ))}
            </Swiper>
            
        </div>
    );
};

export default Row ;


/*
<div className='row-image'>
                { movies.map((movie , index) => (
                    <img key={movie.id} src={`${base_url}${movie.backdrop_path}`} alt={movie.name} />
                ))}
            </div>
            */