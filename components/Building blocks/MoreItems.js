import { Fragment, useEffect, useState } from "react";
import MediaItem from "./MediaItem";
import classes from './MoreItems.module.css';
import { useLocation } from "react-router-dom";
import REQ_ENDPOINTS from "../../api/api";

function MoreItems () {
    const location = useLocation();
    const [moreItems , setMoreItems] = useState([]);
    const [currentLocation , setCurrentLocation] = useState(location.pathname);
    const [pageNumber , setPageNumber] = useState(1);
    const urlLastSegment = location.pathname.split('/').pop();
    
    useEffect( () => {
        async function getMoreItems () {
            if(isNaN(parseInt(urlLastSegment[urlLastSegment.indexOf('-')+1]))) {
                if (urlLastSegment.slice(urlLastSegment.indexOf('-')+1) === 'trending') {
                    const response = await fetch(`${REQ_ENDPOINTS.useBaseURL}/3/trending/${urlLastSegment.slice(0,urlLastSegment.indexOf('-'))}/day?api_key=${REQ_ENDPOINTS.API_KEY}&language=en-US&page=${pageNumber}`);
                    const data  = await response.json();
                    if (currentLocation !== location.pathname) {
                        setMoreItems([])
                    }
                    setMoreItems(prev => {
                    return [...prev , ...data.results]
                    });
                }
                else if (urlLastSegment.slice(urlLastSegment.indexOf('-')+1) === 'upcoming' || urlLastSegment.slice(urlLastSegment.indexOf('-')+1) === 'popular' || urlLastSegment.slice(urlLastSegment.indexOf('-')+1) === 'top_rated') {
                    const response = await fetch(`${REQ_ENDPOINTS.useBaseURL}/3/${urlLastSegment.slice(0,urlLastSegment.indexOf('-'))}/${urlLastSegment.slice(urlLastSegment.indexOf('-')+1)}?api_key=${REQ_ENDPOINTS.API_KEY}&language=en-US&page=${pageNumber}`);
                    const data  = await response.json();
                    if (currentLocation !== location.pathname) {
                        setMoreItems([])
                    }
                    setMoreItems(prev => {
                    return [...prev , ...data.results]
                    });
                    
                }
            }
            else {
                if(urlLastSegment.slice(urlLastSegment.indexOf('-')+1) === '28' || 
                urlLastSegment.slice(urlLastSegment.indexOf('-')+1) === '35' ||
                urlLastSegment.slice(urlLastSegment.indexOf('-')+1) === '27' ||
                urlLastSegment.slice(urlLastSegment.indexOf('-')+1) === '99' ||
                urlLastSegment.slice(urlLastSegment.indexOf('-')+1) === '16' ||
                urlLastSegment.slice(urlLastSegment.indexOf('-')+1) === '80' ||
                urlLastSegment.slice(urlLastSegment.indexOf('-')+1) === '10751' ||
                urlLastSegment.slice(urlLastSegment.indexOf('-')+1) === '10749') {
                    const response = await fetch(`${REQ_ENDPOINTS.useBaseURL}/3/discover/${urlLastSegment.slice(0,urlLastSegment.indexOf('-'))}?api_key=${REQ_ENDPOINTS.API_KEY}&with_genres=${urlLastSegment.slice(urlLastSegment.indexOf('-')+1)}&language=en-US&page=${pageNumber}`);
                    const data  = await response.json();
                    if (currentLocation !== location.pathname) {
                        setMoreItems([])
                    }
                    setMoreItems(prev => {
                    return [...prev , ...data.results]
                    });
                    

                }
                else {
                    const response = await fetch(`https://api.themoviedb.org/3/${urlLastSegment.slice(0,urlLastSegment.indexOf('-'))}/${urlLastSegment.slice(urlLastSegment.indexOf('-')+1)}/recommendations?api_key=${REQ_ENDPOINTS.API_KEY}&language=en-US&page=${pageNumber}`);
                    const data  = await response.json();
                    if (currentLocation !== location.pathname) {
                        setMoreItems([])
                    }
                    setMoreItems(prev => {
                    return [...prev , ...data.results]
                    });
                    
                }
                
            }
        }
        
        getMoreItems()
    } , [pageNumber,urlLastSegment,setMoreItems] );

    return(
        <Fragment>
            {moreItems.length === 0 ? '' : 
                <Fragment>
                    <h1 className={classes['more-like-title']}>More like this</h1>
                    <div className={classes['more-like-this-container']}>   
                    {moreItems ? moreItems.map((item, index) => {
                        return(
                            <MediaItem 
                                key = {index}
                                mediaType = {urlLastSegment.slice(0,urlLastSegment.indexOf('-'))}
                                mediaId = {item.id}
                                itemImgSrc = {item.poster_path}
                                mediaTitle = {urlLastSegment.slice(0,urlLastSegment.indexOf('-')) === 'movie' ? item.title : item.name}
                            />
                        )
                    }):''
                    
                    }
                    </div>
                </Fragment>
            
            }
            
        </Fragment>
        
    )
}

export default MoreItems;

