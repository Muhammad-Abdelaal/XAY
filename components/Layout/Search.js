import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import REQ_ENDPOINTS from '../../api/api';
import classes from './Search.module.css';
import {useDispatch} from 'react-redux';
import {searchSliceActions} from '../../store/store'

function Search () {
    const [searchInput , setSearchInput] = useState('');
    const [searchResults ,setSearchResults] = useState([]);
    const dispatch = useDispatch();
    
    useEffect ( () => {
        const searchInputTimeout = setTimeout( async function getSearchData(){
            
            const response = await fetch(`https://api.themoviedb.org/3/search/multi?api_key=${REQ_ENDPOINTS.API_KEY}&language=en-US&query=${searchInput}&page=1&include_adult=false`);
            const data = await response.json();
            setSearchResults(data.results);

        },300 );
            
        return () => {
            clearTimeout(searchInputTimeout);
        };
    } , [searchInput]);

    function changeSearchInput (e) {
        setSearchInput(e.target.value);
    }
    function closeSearch () {
        dispatch(searchSliceActions.setIsSearchOpen({isSearchOpen:false}))
    }
    return(
        <div className={classes['search-container']}>
            <div onClick={closeSearch} className={classes['close-search']}>X</div>
            <input onChange={changeSearchInput} className={classes['search-bar']} placeholder = 'Search' type='text'  />
            <div className={classes['search-dropper']}> 
                <ul className={classes['search-dropper__list']}>
                    {searchResults ? searchResults.map( (item, index) => {
                        const titledWith = item.media_type === 'person' ? 
                        (item.known_for_department === "Acting" ? 'Actor'
                        :item.known_for_department === "Writing" ? 'Writer'
                        :item.known_for_department === "Directing" ? 'Director'
                        :item.known_for_department === "Production" ? 'Producer'
                        :''
                        ): item.media_type ;

                        const mediaName = item.media_type === 'person' || item.media_type === 'tv' ? item.name : item.title 
                        return(
                            item.media_type === 'person' ?
                            (item.profile_path === null ? '' :
                                <Link onClick={closeSearch} to={`browse/${item.media_type}/${item.media_type}-${item.id}`} key={index}>
                                <li  className={classes['search-result-item']}>
                                    <img className={classes['search-result-item__img']} 
                                        src={item.media_type === 'person' ? `${REQ_ENDPOINTS.useImgBaseURLCast}${item.profile_path}` 
                                        : `${REQ_ENDPOINTS.useImgBaseURLPoster}${item.poster_path}`}
                                    />
                                    <div className={classes['search-media-details-container']}>
                                        <div className={classes['search-media-detials-title']}>{mediaName}</div>
                                        <div className={classes['search-media-detials-type']}>{titledWith}</div>
                                    </div>
                                </li>    
                                </Link>
                            ) : (item.poster_path === null ?'' :
                            
                                <Link onClick={closeSearch} to={`browse/${item.media_type}/${item.media_type}-${item.id}`} key={index}>
                                <li  className={classes['search-result-item']}>
                                    <img className={classes['search-result-item__img']} 
                                        src={item.media_type === 'person' ? `${REQ_ENDPOINTS.useImgBaseURL}${item.profile_path}` 
                                        : `${REQ_ENDPOINTS.useImgBaseURLPoster}${item.poster_path}`}
                                    />
                                    <div className={classes['search-media-details-container']}>
                                        <div className={classes['search-media-detials-title']}>{mediaName}</div>
                                        <div className={classes['search-media-detials-type']}>{titledWith}</div>
                                    </div>
                                </li>    
                                </Link>
                            )
                        )
                    } ) : ''}
                </ul>
            </div>
        </div>
    )
}

export default Search;


