import { useState , useEffect } from "react";
import axios from "../axios" ;
import styled from "styled-components" ;
import { base_url , API_KEY } from "../requests" ;
import { PlayButton , AddButton} from "../ReusableComponents"; 
import PlayArrowIcon from '@material-ui/icons/PlayArrow';
import AddIcon from '@material-ui/icons/Add';


const truncate = (str, n) => str?.length > n ? str.substr(0, n - 1) + "..." : str

const link = "https://image.tmdb.org/t/p/original/bQXAqRx2Fgc46uCVWgoPz5L5Dtr.jpg";
//`${base_url}${movie?.backdrop_path}`
//{movie?.title || movie?.name}
//{truncate(movie?.overview, 320)}

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
    return (
        <BannerWrapper url={link}>
            <BannerTitle>Black Adam</BannerTitle>
            <BannerDescription>Black Adam wields superpowers bestowed upon him by magic, including flight, superhuman strength, invulnerability, enhanced speed and the ability to shoot lightning. His powers are triggered by saying the magic word “Shazam,” much like the superhero Shazam, his modern-day successor and rival.</BannerDescription>
            <FlexContainer>
                <PlayButton><PlayArrowIcon size="small" />Watch</PlayButton>
                <AddButton><AddIcon />Add List</AddButton>
            </FlexContainer>
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

const FlexContainer = styled.div`
    display: flex;
`