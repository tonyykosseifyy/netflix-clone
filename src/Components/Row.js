import { useState , useEffect } from "react" ;
import "./Row.css" ;
import axios from "../axios" ;
import { base_url } from "../requests" ;
import { Swiper, SwiperSlide } from "swiper/react";
import SwiperCore, { Navigation } from 'swiper';

// Import Swiper styles
//npm install swiper@6.8.4
import "swiper/css/bundle";
SwiperCore.use([Pagination]);

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

/*<Swiper slidesPerView={3} spaceBetween={30} freeMode={true} pagination={{
  "clickable": true
}} className="mySwiper">
  <SwiperSlide>Slide 1</SwiperSlide><SwiperSlide>Slide 2</SwiperSlide><SwiperSlide>Slide 3</SwiperSlide><SwiperSlide>Slide 4</SwiperSlide><SwiperSlide>Slide 5</SwiperSlide><SwiperSlide>Slide 6</SwiperSlide><SwiperSlide>Slide 7</SwiperSlide><SwiperSlide>Slide 8</SwiperSlide><SwiperSlide>Slide 9</SwiperSlide>
  </Swiper>*/