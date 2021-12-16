import { NavLink } from 'react-router-dom';
import s from './Navbar.module.css';

const Navbar = () => {
  return (
    <nav className={s.nav}>
      <NavLink exact to="/" className={s.link} activeClassName={s.active}>
        Home
      </NavLink>
      <NavLink to="/movies" className={s.link} activeClassName={s.active}>
        Movies
      </NavLink>
    </nav>
  );
};

export default Navbar;
