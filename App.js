import { Fragment } from "react";
import { Route, Routes, Navigate, useLocation } from "react-router-dom";
import Header from "./components/Layout/Header";
import Main from "./components/Layout/Main";
import SideBar from "./components/Layout/SideBar";
import Home from "./Pages/Home";
import MediaDetails from "./Pages/MediaDetails";
import CategoryPage from "./Pages/CategoryPage";
import REQ_ENDPOINTS from "./api/api";
import Search from "./components/Layout/Search";
import {useSelector} from 'react-redux';

const browseMovieCategroies = 
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
]
const browseTvCategroies = 
[   {mediaType:'movie' , reqType:'trending' , genre:'' , reqURL:REQ_ENDPOINTS.fetchTrendingMovies},
    {mediaType:'movie' , reqType:'top_rated' , genre:'' , reqURL:REQ_ENDPOINTS.fetchUpcoming},
    {mediaType:'movie' , reqType:'popular' , genre:'' , reqURL:REQ_ENDPOINTS.fetchPopular},
    {mediaType:'movie' , reqType:'action' , genre:'10759' , reqURL:REQ_ENDPOINTS.fetchMovieGenre},
    {mediaType:'movie' , reqType:'crime' , genre:'80' , reqURL:REQ_ENDPOINTS.fetchMovieGenre},
    {mediaType:'movie' , reqType:'drama' , genre:'18' , reqURL:REQ_ENDPOINTS.fetchMovieGenre},
    {mediaType:'movie' , reqType:'animation' , genre:'16' , reqURL:REQ_ENDPOINTS.fetchMovieGenre},
    {mediaType:'movie' , reqType:'comedy' , genre:'35' , reqURL:REQ_ENDPOINTS.fetchMovieGenre},
    {mediaType:'movie' , reqType:'family' , genre:'10751' , reqURL:REQ_ENDPOINTS.fetchMovieGenre},
    {mediaType:'movie' , reqType:'mystery' , genre:'9648' , reqURL:REQ_ENDPOINTS.fetchMovieGenre},
]
const movieCategoriesRoute = browseMovieCategroies.map( (item,index) => {
  const passedId = index < 3 ? item.reqType : item.genre;
  return (
    <Route key={index} path={`browse/${item.mediaType}/${item.mediaType}-${passedId}`} element= {<CategoryPage/>} />
  )
} );

const tvCategoriesRoute = browseTvCategroies.map( (item,index) => {
  const passedId = index < 3 ? item.reqType : item.genre;
  return (
    <Route key={index} path={`browse/${item.mediaType}/${item.mediaType}-${passedId}`} element= {<CategoryPage/>} />
  )
} );

 
function App() {
  const location = useLocation();
  const isSearchOpen = useSelector(state => state.searchSlice.isSearchOpen);
  return (
    <Fragment>
      {isSearchOpen ? <Search /> : ''}
      <Main>
        <Header />
        <SideBar />
        <Routes>
          <Route path="/" element= {<Navigate to ='home/movie' />} />
          <Route path="home/movie" element= {<Home />} />
          <Route path="home/tv" element= {<Home />} />
          <Route path="browse/movie/:mediaId" element= {<MediaDetails />} />
          <Route path="browse/tv/:mediaId" element= {<MediaDetails />} />
          {movieCategoriesRoute}
          {tvCategoriesRoute}
          <Route path = '*' element = {<h1>NOT FOUND</h1>} />
        </Routes>
      </Main>
    </Fragment>
  );
}

export default App;
