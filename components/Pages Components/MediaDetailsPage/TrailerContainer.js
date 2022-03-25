import { useEffect, useState } from "react";
import REQ_ENDPOINTS from "../../../api/api";
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faPlay} from '@fortawesome/free-solid-svg-icons';
import classes from './MediaDetails.module.css';
import {useDispatch} from 'react-redux';
import {trailerSliceActions} from '../../../store/store';
import noImg from '../../../assets/no_image.jpg';

function TrailerContainer (props) {
    const dispatch = useDispatch();
    const [trailers , setTrailers] = useState([]);
    const [trailerImgs , setTrailerImgs] = useState()
    useEffect( ()=> {
        async function getTrailerData () {
            const response = await fetch(`https://api.themoviedb.org/3/${props.idParams.mediaId.charAt(0) === 'm' ? 'movie' : 'tv'}/${props.mediaId}/videos?api_key=${REQ_ENDPOINTS.API_KEY}&language=en-US`);
            const data = await response.json();
            const filteredTrialers = data.results.filter( item => {
                return item.type === 'Trailer';
            });
            const imgsResponse = await fetch (`https://api.themoviedb.org/3/${props.idParams.mediaId.charAt(0) === 'm' ? 'movie' : 'tv'}/${props.mediaId}/images?api_key=${REQ_ENDPOINTS.API_KEY}&language=en-US${REQ_ENDPOINTS.useImgParams}`);
            const imgsData = await imgsResponse.json();
            setTrailerImgs(imgsData.backdrops);
            if (filteredTrialers.length === 0 ) {
                setTrailers([]);
            }
            else if (filteredTrialers.length === 1) {
                setTrailers([filteredTrialers[0]]);
            }
            else {
                setTrailers([filteredTrialers[0] , filteredTrialers[1]]);
            }
        }
        getTrailerData();
    } , [props] );

    
    return (
        <div className={classes['trailer-container']}>
            {trailerImgs ? 
                trailers.map( (item, index) => {
                    function sendTrailerKey () {
                        dispatch(trailerSliceActions.changeTrailerKey({newTrailerKey:item.key}));
                        dispatch(trailerSliceActions.setIsTrailerOpen({isTrailerOpen:true}));
                    }
                    return (
                        <li key={index} onClick={sendTrailerKey} className={classes['trailer-item']}>
                            {trailerImgs.length === 0 ? <img alt="trailer-img" style={{}} className={classes['trailer-item__img']} src={noImg} />
                            : trailerImgs.length  === 1 ||trailerImgs.length  === 2 ? <img alt="trailer-img" className={classes['trailer-item__img']} src={`${REQ_ENDPOINTS.useImgBaseURLBackdrop}${trailerImgs[index].file_path}`} />
                            :trailerImgs.length > 1 ?
                             <img alt="trailer-img" className={classes['trailer-item__img']} src={`${REQ_ENDPOINTS.useImgBaseURLBackdrop}${trailerImgs[index+1].file_path }`} />
                             : '' }
                            <div className={classes['trailer-icon-container']}>
                                <FontAwesomeIcon className={classes['trailer-item__icon']} icon={faPlay} />
                            </div>
                            <div className={classes['trailer-overlay']} />
                        </li>
                    )
                } ):''
            }
        </div>
    )
}

export default TrailerContainer;