import classes from './Header.module.css';
import logoImg from '../../assets/Xay.png';
import { useSelector} from 'react-redux';
import { Link, useLocation } from 'react-router-dom';

function Header() {
  const location = useLocation();
  const currentRoute = location.pathname.split('/');
  //----- GET UI REDUX VARIABLES -----//
  const mainLogo = useSelector(state => state.mainComponentSlice.mainLogo);
  //---------------------------------//
  return(
        <header className={classes['header']}>
            <div className={classes['logo-container']}>
              <Link to={currentRoute[2] === 'movie' ? '/home/movie' : '/home/tv'}><img alt='logo' className={classes.logo} src={location.pathname === '/home/movie' || location.pathname === '/home/tv' || mainLogo === '' ? logoImg :mainLogo} /> </Link> 
            </div>
        </header>
  )
}

export default Header;