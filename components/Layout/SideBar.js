import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faFilm, faTv, faMagnifyingGlass} from '@fortawesome/free-solid-svg-icons';
import {faSafari} from '@fortawesome/free-brands-svg-icons'
import classes from './SideBar.module.css';
import { Link } from 'react-router-dom';
import {useDispatch} from 'react-redux';
import {searchSliceActions} from '../../store/store'

function SideBar () {

    const dispatch = useDispatch();

    function openSearch () {
        dispatch(searchSliceActions.setIsSearchOpen({isSearchOpen:true}));
    }
    return(
        <div className={classes['side-bar']}>
            <div className={classes['side-bar__content']}>
                <Link to={'browse'} className={classes['side-bar__item-link']}><div className={classes['side-menu__movies-btn']}>
                    <FontAwesomeIcon className={classes['nav-icon']} icon={faSafari}/>
                </div></Link>
                <Link to={'home/movie'} className={classes['side-bar__item-link']}><div className={classes['side-menu__movies-btn']}>
                    <FontAwesomeIcon className={classes['nav-icon']} icon={faFilm}/>
                </div></Link>
                <Link to={'home/tv'} className={classes['side-bar__item-link']}><div className={classes['side-menu__series-btn']}>
                    <FontAwesomeIcon className={classes['nav-icon']} icon={faTv}/>
                </div></Link>
                <div onClick={openSearch} className={classes['side-menu__search-btn']}>
                    <FontAwesomeIcon className={classes['nav-icon']} icon={faMagnifyingGlass}/>
                </div>
            </div>
            
        </div>
    )
}

export default SideBar;