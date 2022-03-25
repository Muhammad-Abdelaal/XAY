import classes from './Carousel.module.css';
import CarouselMediaItem from './CarouselMediaItem'
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {
    faCaretLeft,
    faCaretRight
} from '@fortawesome/free-solid-svg-icons';
import { useEffect, useState, useRef } from 'react';
import REQ_ENDPOINTS from '../../api/api';
import { Link, useLocation } from 'react-router-dom';
function Carousel (props) {
    // GETTING WINDOW WIDTH
    const [windowWidth , setWindowWidth ] = useState(window.innerWidth);
    window.addEventListener('resize' , function resizeEvent (e){
        setWindowWidth(e.target.innerWidth)
    });
    //----------------------
    const location = useLocation();
    // CAROUSEL VARS 
    var slideNumber = 0;
    const carousel = useRef();
    //----------------------
    // STATE VARIABLES 
    const [fetchedData , setFetchedData] = useState()
    var carouselListItems ;
    //----------------
    
    //  GETTING CAROUSEL DATA
    useEffect( ()=>{
        async function fetchCarouselData () {
            const response = await fetch(`${REQ_ENDPOINTS.useBaseURL}${props.reqURL}${props.genre}`);
            const data = await response.json();
            setFetchedData(data.results);
        }
        fetchCarouselData();
        
    } ,[props.reqURL, props.genre] );
    
    //-----------------------

    if (fetchedData) {
        carouselListItems = fetchedData.map( (item , index )  => {
            return(
                <CarouselMediaItem 
                 key={item.id}
                 mediaType = {props.mediaType}
                 mediaItemLeftPositionAmount = {windowWidth >= 992 ? 20 : windowWidth >= 768 && windowWidth < 992 ? 25 : 50}
                 mediaItemMarginAmount = {windowWidth >= 992 ? '10px 0.5%' : '5px 0.5% 5px 0.5%'}
                 mediaItemWidth = {windowWidth >= 992 ? 19 : windowWidth >= 768 && windowWidth < 992 ? 24 : 46}
                 mediaItemIndex = {index} 
                 mediaItemName = {props.mediaType === "movie" ? item.title : item.name}
                 mediaItemPosterSrc = {item.poster_path} 
                 mediaItemId = {item.id} />
            )
        })
    }
    
    // SLIDING FUNCTIONS 
    function slideCarouselRight() {
        const carouselWidth = carousel.current.offsetWidth;
        if(slideNumber === 0 ) {
            return;
        }
        else {
            slideNumber--;
            const pxToMove = carouselWidth * slideNumber;
            carousel.current.style.transform = `translateX(-${pxToMove}px)`;
        }
    
    }
    function slideCarouselLeft() {
        const carouselWidth = carousel.current.offsetWidth;
        if ( windowWidth >= 992) {
            if(slideNumber === 3 ) {
                return;
            }
            else {
                slideNumber++;
                const pxToMove = carouselWidth * slideNumber;
                carousel.current.style.transform = `translateX(-${pxToMove}px)`;
            }
        }
        else if (windowWidth >= 768 && windowWidth < 992 ) {
            if(slideNumber === 4 ) {
                return;
            }
            else {
                slideNumber++;
                const pxToMove = carouselWidth * slideNumber;
                carousel.current.style.transform = `translateX(-${pxToMove}px)`;
            }
        }
        else {
            if(slideNumber === 9 ) {
                return;
            }
            else {
                slideNumber++;
                const pxToMove = carouselWidth * slideNumber;
                carousel.current.style.transform = `translateX(-${pxToMove}px)`;
            }
        }
         
        
    }
    //------------------
    return (
        <div className={classes['carousel-container']}>
             <div className={classes['carousel-actions']}>
                <button  onClick={slideCarouselRight} className={classes['carousel-container__actions']}>
                    <FontAwesomeIcon className={classes['button-icon']} icon={faCaretLeft}/>
                </button>
                <button onClick={slideCarouselLeft} className={classes['carousel-container__actions']}>
                <FontAwesomeIcon className={classes['button-icon']} icon={faCaretRight}/>
                </button>
            </div>
            <div className={classes['carousel-title-browse']}>
                <div className={classes['carousel-title']}>{`${props.carouselTitle} ${location.pathname === '/home/movie' ? 'Movies' : 'Series'}`}</div>
                <div className={classes['carousel-browse']}><Link to={`/browse/${props.mediaType}/${props.mediaType}-${props.reqType}`}>View all</Link> </div>
            </div>
            
            <div className={classes['carousel-content-container']}>
                
                <ul ref={carousel} className={classes['carousel']}>
                    {carouselListItems ? carouselListItems : '' }
                </ul>
                
            </div>
        </div>
    )
}

export default Carousel;