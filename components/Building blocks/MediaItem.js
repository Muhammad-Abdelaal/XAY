import { Link } from "react-router-dom";
import REQ_ENDPOINTS from "../../api/api";
import classes from './MediaItem.module.css';

function MediaItem (props) {
    function scrollTop () {
        window.scrollTo(0, 0)
    }
    return(
        
        <li className={classes['media-item']}>
            <Link onClick={scrollTop} to={`/browse/${props.mediaType}/${props.mediaType}-${props.mediaId}`}>
                {props.itemImgSrc === null ? <div className={classes['empty-img']}>NO IMAGE</div> : <img alt="media-poster" className={classes['media-item__img']} src={`${REQ_ENDPOINTS.useImgBaseURLPoster}${props.itemImgSrc}`} />}
            </Link>
            <p className={classes['media-item__title']}>{props.mediaTitle}</p>
        </li>
            
    )
}

export default MediaItem;