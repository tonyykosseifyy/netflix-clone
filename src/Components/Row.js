import { useState , useEffect } from "react" ;
import "./Row.css" ;
import axios from "../axios" ;
import { base_url } from "../requests" ;
import { Swiper, SwiperSlide } from "swiper/react";
import SwiperCore, { Navigation } from 'swiper';
import YouTube from 'react-youtube';
import movieTrailer from 'movie-trailer';


import 'swiper/swiper-bundle.min.css'
import 'swiper/swiper.min.css'

SwiperCore.use([Navigation]);

const opts = {
    height: "390",
    width: "99%",
    playerVars: {
      autoplay: 1,
    }
  }


//movie.poster_path : movie.backdrop_path
const Row = ({ title , url }) => {
    const [ movies , setMovies ] = useState([]);
    const [ width , setWidth ] = useState(window.innerWidth) ;
    const [trailerUrl, setTrailerUrl] = useState("");

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
    const handleClick = (movie) => {
        if (trailerUrl) {
          setTrailerUrl('');
        } else {
          movieTrailer(movie?.title || "")
            .then(url => {
              const urlParams = new URLSearchParams(new URL(url).search);
              setTrailerUrl(urlParams.get('v'));
            }).catch((error) => console.log(error));
        }
    }
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
                        <img onClick={() => handleClick(movie)} src={`${base_url}${movie.backdrop_path}`} alt={movie.name} />
                    </SwiperSlide>
                ))}
            </Swiper>
            <div style={{ padding: "40px" }}>
                {trailerUrl && <YouTube videoId={trailerUrl} opts={opts} />}
            </div>

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