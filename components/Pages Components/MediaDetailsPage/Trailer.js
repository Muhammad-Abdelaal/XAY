import classes from './MediaDetails.module.css';
import {useSelector , useDispatch} from 'react-redux';
import {trailerSliceActions} from '../../../store/store';

function Trailer () {
    const trailerKey = useSelector(state => state.trailerSlice.initialTrailerKey);
    const dispatch = useDispatch();
    function closeTrailer () {
        dispatch(trailerSliceActions.changeTrailerKey({newTrailerKey:''}));
        dispatch(trailerSliceActions.setIsTrailerOpen({isTrailerOpen:false}));
    }
    return(
        <div className={classes['trailer-video-container']}>
            <div onClick={closeTrailer} className={classes['close-trailer']}>X</div>
            <iframe  className={classes['trailer-video']} src={`https://www.youtube.com/embed/${trailerKey}`}  allowFullScreen/> 
        </div>
    )
}

export default Trailer;