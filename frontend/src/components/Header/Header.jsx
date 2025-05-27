import React from 'react';
import { NavLink } from 'react-router-dom';
import { getCurrentWeekStart } from '../../utils/getCurrentWeekStart' 
import './Header.css';


const Header = () => {
  const weekStart = getCurrentWeekStart()

  return (
    <header className="header">
      <div className="header__container">
        <div className="header__logo">
          <strong>Life</strong> storage
        </div>
        <nav className="header__nav">
          <NavLink to="/" className="header__link">Календарь жизни</NavLink>
          <NavLink to={`/week/${weekStart}`} className="header__link">Текущая неделя</NavLink>
          <NavLink to="/profile" className="header__link">Профиль</NavLink>
        </nav>
      </div>
    </header>
  );
};

export default Header;
