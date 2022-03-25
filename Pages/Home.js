import { Fragment } from "react";
import { useLocation } from "react-router-dom";
import REQ_ENDPOINTS from "../api/api";
import Carousel from "../components/Building blocks/Carousel";




function Home () {
    const location = useLocation();
    const homeRoute = location.pathname;

    const carouselData =  homeRoute === '/home/movie' ?  
[   {mediaType:'movie' , reqType:'trending' , genre:'' , reqURL:REQ_ENDPOINTS.fetchTrendingMovies},
    {mediaType:'movie' , reqType:'upcoming' , genre:'' , reqURL:REQ_ENDPOINTS.fetchUpcoming},
    {mediaType:'movie' , reqType:'popular' , genre:'' , reqURL:REQ_ENDPOINTS.fetchPopular},
    {mediaType:'movie' , reqType:'action' , genre:'28' , reqURL:REQ_ENDPOINTS.fetchMovieGenre},
    {mediaType:'movie' , reqType:'crime' , genre:'80' , reqURL:REQ_ENDPOINTS.fetchMovieGenre},
    {mediaType:'movie' , reqType:'horror' , genre:'27' , reqURL:REQ_ENDPOINTS.fetchMovieGenre},
    {mediaType:'movie' , reqType:'animation' , genre:'16' , reqURL:REQ_ENDPOINTS.fetchMovieGenre},
    {mediaType:'movie' , reqType:'comedy' , genre:'35' , reqURL:REQ_ENDPOINTS.fetchMovieGenre},
    {mediaType:'movie' , reqType:'family' , genre:'10751' , reqURL:REQ_ENDPOINTS.fetchMovieGenre},
    {mediaType:'movie' , reqType:'romance' , genre:'10749' , reqURL:REQ_ENDPOINTS.fetchMovieGenre},
] : homeRoute === '/home/tv' ?
[   {mediaType:'tv' , reqType:'trending' , genre:'' , reqURL:REQ_ENDPOINTS.fetchTrendingSeries},
    {mediaType:'tv' , reqType:'top_rated' , genre:'' , reqURL:REQ_ENDPOINTS.fetchTopRatedSeries},
    {mediaType:'tv' , reqType:'popular' , genre:'' , reqURL:REQ_ENDPOINTS.fetchPopularSeries},
    {mediaType:'tv' , reqType:'action' , genre:'10759' , reqURL:REQ_ENDPOINTS.fetchSeriesGenre},
    {mediaType:'tv' , reqType:'crime' , genre:'80' , reqURL:REQ_ENDPOINTS.fetchSeriesGenre},
    {mediaType:'tv' , reqType:'drama' , genre:'18' , reqURL:REQ_ENDPOINTS.fetchSeriesGenre},
    {mediaType:'tv' , reqType:'kids' , genre:'10762' , reqURL:REQ_ENDPOINTS.fetchSeriesGenre},
    {mediaType:'tv' , reqType:'comedy' , genre:'35' , reqURL:REQ_ENDPOINTS.fetchSeriesGenre},
    {mediaType:'tv' , reqType:'family' , genre:'10751' , reqURL:REQ_ENDPOINTS.fetchSeriesGenre},
    {mediaType:'tv' , reqType:'mystery' , genre:'9648' , reqURL:REQ_ENDPOINTS.fetchSeriesGenre},
] : ''
    
    return(
        <Fragment>
            {carouselData.map((item , index) => {
                const passedId = index < 3 ? item.reqType : item.genre;
                return(
                    <Carousel key = {index} mediaType = {item.mediaType} reqType = {passedId} genre = {item.genre} reqURL = {item.reqURL} carouselTitle = {`${item.reqType.charAt(0).toUpperCase()}${item.reqType.slice(1)}`} />
                )
            })}
        </Fragment>
    )
}

export default Home;