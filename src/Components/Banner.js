import { useState , useEffect } from "react";
import axios from "../axios" ;
import styled from "styled-components" ;
import { base_url , API_KEY } from "../requests" ;
import { PlayButton } from "../ReusableComponents"; 
import PlayArrowIcon from '@material-ui/icons/PlayArrow';

const truncate = (str, n) => str?.length > n ? str.substr(0, n - 1) + "..." : str

const Banner = ({ url }) => {
    const [ movie , setMovie ] = useState() ; 
    const fetchOriginals = async () => {
        try {   
            const response = await axios.get(url);
            setMovie(response.data.results[0]);
        } catch(err) {
            console.log(err)
        }
    }
    useEffect(() => {
        fetchOriginals();
    }, [])
    console.log(movie) ;
    return (
        <BannerWrapper url={`${base_url}${movie?.backdrop_path}`}>
            <BannerTitle>{movie?.title || movie?.name}</BannerTitle>
            <BannerDescription>{truncate(movie?.overview, 320)}</BannerDescription>
            <PlayButton>Watch</PlayButton>
        </BannerWrapper>
    );
};


export default Banner ;


const BannerWrapper = styled.section`
    background-image: url(${props => props.url });
    background-size: cover;
    background-repeat: no-repeat;
    background-position: center ;
    min-height: 700px;
    margin-top: -70px;
    position: relative ;
    padding: 0 70px;
    padding-top: 200px;
    padding-bottom: 40px;
    &::before {
        content: '';
        position: absolute;
        left: 0;
        right: 0;
        width: 100%;
        bottom: 0;
        z-index: 2;
        height: 200px;
        background-image: linear-gradient(to bottom,transparent 5% ,#141414 95%);
    }
`

const BannerTitle = styled.h1`
    font-size: 2.3rem ;
`
const BannerDescription = styled.p`
    max-width: 500px;
    margin-top: 20px;
`