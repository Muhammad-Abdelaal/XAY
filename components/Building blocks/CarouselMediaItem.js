import { Link } from "react-router-dom";
import REQ_ENDPOINTS from "../../api/api";
import classes from './CarouselMediaItem.module.css';

function CarouselMediaItem ({mediaType ,mediaItemName, mediaItemPosterSrc, mediaItemIndex , mediaItemLeftPositionAmount , mediaItemMarginAmount,mediaItemWidth ,mediaItemId}) {
    let currentPositionFromLeft = mediaItemIndex * mediaItemLeftPositionAmount
    
    return(
        <li className={classes['carousel-media-item']} style={{left: `${currentPositionFromLeft}%` , margin:`${mediaItemMarginAmount}` , width:`${mediaItemWidth}%`}}>
            <Link to ={`/browse/${mediaType}/${mediaType}-${mediaItemId}`} className={classes['carousel-media-item__link']}>
                <img className={classes['carousel-media-item__img']} alt="poster" src={`${REQ_ENDPOINTS.useImgBaseURLPoster}${mediaItemPosterSrc}`} />
            </Link>
            <p className={classes['carousel-media-item__title']} >{mediaItemName}</p>
        </li>
    )
}

export default CarouselMediaItem;