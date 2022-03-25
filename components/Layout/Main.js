import classes from './Main.module.css';
import { useDispatch, useSelector} from 'react-redux';
import { useLocation } from "react-router-dom";
import {mainComponentSliceActions} from '../../store/store';
function Main (props) {
    const location = useLocation();
    const dispatch = useDispatch();
    const mainBackground = useSelector(state => state.mainComponentSlice.mainBackground);
    const urlLastSegment = location.pathname.split('/').pop();
    if (location.pathname === '/home/movie' || location.pathname === '/home/tv') {
        dispatch(mainComponentSliceActions.changeMainBackground({mainNewBackground:''}));
        dispatch(mainComponentSliceActions.changeLogo({newLogo:''}))
    }
    return (
        <main style={location.pathname === '/home/movie' || location.pathname === '/home/tv' ? {background : 'transparent'} : {backgroundImage:`url(${mainBackground})`} } className={classes['main']}>
            
            <div className={classes['main-content']}>
                {props.children}
            </div>
            
            <div className={classes['main-overlay']}></div>
        </main>
    )
}

export default Main;

