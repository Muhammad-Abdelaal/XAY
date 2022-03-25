import { useEffect, useState , Fragment , useRef} from "react";
import { Link, Navigate, useParams } from "react-router-dom";
import REQ_ENDPOINTS from "../api/api";
import {useDispatch , useSelector} from 'react-redux';
import { mainComponentSliceActions} from '../store/store';
import classes from '../components/Pages Components/MediaDetailsPage/MediaDetails.module.css';
import TheBatmanimgILike from '../assets/z.jpg';
import TheKingsManimgILike from '../assets/e.jpg';
import MoreItems from "../components/Building blocks/MoreItems";
import TrailerContainer from "../components/Pages Components/MediaDetailsPage/TrailerContainer";
import Trailer from "../components/Pages Components/MediaDetailsPage/Trailer";



function MediaDetails () {
    const dispatch = useDispatch();
    const idParams = useParams();
    const overview = useRef();
    const cast = useRef();
    const [isOverviewOpen , setIsOverviewOpen] = useState(false);
    const [isCastOpen , setIsCastOpen] = useState(false);
    const isTrailerOn = useSelector(state => state.trailerSlice.isTrailerOpen)
    const mediaId = idParams.mediaId.slice(idParams.mediaId.indexOf('-')+1);
    const [isIdValid , setIsIdValid] = useState ();
    const [mediaDetails , setMediaDetails] = useState();
    const date = mediaDetails && (mediaDetails.release_date || mediaDetails.first_air_date) ? new Date(idParams.mediaId.charAt(0) === 'm' ? mediaDetails.release_date.slice(0,4):mediaDetails.first_air_date.slice(0,4) ,
    (idParams.mediaId.charAt(0) === 'm' ? mediaDetails.release_date.charAt(5) === '0' :mediaDetails.first_air_date.charAt(5) === '0')? (idParams.mediaId.charAt(0) === 'm' ? mediaDetails.release_date.charAt(6)-1 : mediaDetails.first_air_date.charAt(6)-1):(idParams.mediaId.charAt(0) === 'm' ?mediaDetails.release_date.slice(5,7)-1 :mediaDetails.first_air_date.slice(5,7)-1 ),
    (idParams.mediaId.charAt(0) === 'm' ? mediaDetails.release_date.charAt(8) === '0' : mediaDetails.first_air_date.charAt(8) === '0' )? (idParams.mediaId.charAt(0) === 'm' ? mediaDetails.release_date.charAt(9) :mediaDetails.first_air_date.charAt(9))  : (idParams.mediaId.charAt(0) === 'm' ? mediaDetails.release_date.slice(8,10) : mediaDetails.first_air_date.slice(8,10)) ) : '';
    
    const mediaReleaseDay = mediaDetails ? ` ${date.toLocaleString('en-us', { month: 'long' })} ${date.toLocaleString('en-us', {day:'2-digit'})}`:'';
    
    
    useEffect( () => {
        async function getMediaDetails () {
            const response = await fetch(`https://api.themoviedb.org/3/${idParams.mediaId.charAt(0) === 'm' ? 'movie' : 'tv'}/${mediaId}?api_key=${REQ_ENDPOINTS.API_KEY}&language=en-US&append_to_response=images&include_image_language=null,en`);
            if( response.status === 404) {
                setIsIdValid(false);
                return;
            }
            const data = await response.json();
            const creditsResponse = await fetch(`${REQ_ENDPOINTS.useBaseURL}/3/${idParams.mediaId.charAt(0) === 'm' ? 'movie' : 'tv'}/${mediaId}/credits?api_key=${REQ_ENDPOINTS.API_KEY}&language=en-US`);
            const creditsData = await creditsResponse.json();
            const castData = creditsData.cast.slice(0,11);
            setMediaDetails({...data , castData});
            setIsIdValid(true);
            dispatch(mainComponentSliceActions.changeMainBackground({mainNewBackground:data.title === 'The Batman' ? `${TheBatmanimgILike}`:data.title === 'The King\'s Man'  ? `${TheKingsManimgILike}`:`${REQ_ENDPOINTS.useImgBaseURLBackdrop}${data.backdrop_path}`}))
            dispatch(mainComponentSliceActions.changeLogo({newLogo:(data.images.logos.length) === 0?'':`${REQ_ENDPOINTS.useImgBaseURLLogo}${data.images.logos[0].file_path}`}));
            
        }
        
        getMediaDetails()
    } , [idParams,mediaId,dispatch]);
    // SHOW OVERVIEW AND CAST FUNCTIONS 
    function showOverview () {
        overview.current.style.display = !isOverviewOpen ? 'block' : 'none';
        
        setIsOverviewOpen (prev => !prev)
    }
    function showCast () {
        cast.current.style.display = !isCastOpen ? 'block' : 'none';
        
        setIsCastOpen (prev => !prev)
    }
    return(
       <Fragment>
           {
            isIdValid === true ? 
                    <div  className={classes['media-details']}>
                        {isTrailerOn ?  <Trailer />
                        
                        : <div className={classes['media-details__header']}>
                            <div className={classes['media-details-data-container']}>
                                <div className={classes['release-date']}>{mediaReleaseDay}</div>
                                <div className={classes['media-details-title']}>{mediaDetails.title ? mediaDetails.title : mediaDetails.name}</div>
                                <ul className={classes['media-detaial__genre-list']}>
                                {mediaDetails.genres.map( (item, index) => {
                                        return (
                                            <li className={classes['media-detaial__genre-list-item']} key={index}>{item.name}</li>
                                        )
                                    } )}
                                </ul>
                                <div className={classes['media-details-actions']}>
                                    <div onClick={showOverview} className={classes['show-overview-cast-btn']}>
                                        {isOverviewOpen ? 'Hide overview' : 'Show overview'} 
                                    </div>
                                    <div onClick={showCast} className={classes['show-overview-cast-btn']}>
                                        {isCastOpen ? 'Hide cast' : 'Show cast'}
                                    </div>
                                </div>
                                <div ref={overview} className={classes['overview-container']}>
                                    <div className={classes['overview-title']}>Overview</div>
                                    <p className={classes['overview-text']}>{mediaDetails.overview}</p>
                                </div>
                                <div ref={cast} className={classes['cast-container']}>
                                <div className={classes['cast-title']}>Cast</div>
                                <div className={classes['cast-info-container']}>
                                {mediaDetails.castData.map( (item, index) => {
                                    return item.profile_path ? 
                                    <Link  key={index} className={classes['cast-img-link']} to={'/'}>
                                    <img alt="cast-img" className={classes['cast-img']} src={`${REQ_ENDPOINTS.useImgBaseURLCast}${item.profile_path}`} />
                                    </Link> : '';
                                } )}
                                </div>
                                </div>
                            </div>
                            <TrailerContainer idParams = {idParams} mediaId = {mediaId} />
                            
                          </div> 
                        
                        }
                        
                        <div>
                            <MoreItems />
                        </div>
                        
                    </div>
                
            
            : isIdValid === false ? <Navigate to={'/*'} /> :''
           }
       </Fragment>
    )
}

export default MediaDetails;

