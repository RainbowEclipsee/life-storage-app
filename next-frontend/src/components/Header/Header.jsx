import React from 'react';
import { NavLink } from 'react-router-dom';
import { getCurrentWeekStart } from '../../utils/getCurrentWeekStart' 
import './Header.module.css';


const Header = () => {
  const weekStart = getCurrentWeekStart()

  return (
    <header className={headerMain}>
      <div className={headerContainer}>
        <div className={headerLogo}>
          <strong>Life</strong> storage
        </div>
        <nav className={headerNav}>
          <NavLink to="/" className={headerLink}>Календарь жизни</NavLink>
          <NavLink to={`/week/${weekStart}`} className={headerLink}>Текущая неделя</NavLink>
          <NavLink to="/profile" className={headerLink}>Профиль</NavLink>
        </nav>
      </div>
    </header>
  );
};

export default Header;
