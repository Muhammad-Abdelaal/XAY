import classes from './Header.module.css';
function Searchbar () {

    return(
        <input className={classes['search-bar']} type={'text'} placeholder ='Search...' />
    )
}

export default Searchbar;