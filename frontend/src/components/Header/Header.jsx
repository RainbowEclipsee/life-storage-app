import React from 'react';
import { NavLink } from 'react-router-dom';
import './Header.css';

const Header = () => {
  return (
    <header className="header">
      <div className="header__container">
        <div className="header__logo">
          <strong>Life</strong> storage
        </div>
        <nav className="header__nav">
          <NavLink to="/" className="header__link">Календарь жизни</NavLink>
          <NavLink to="/profile" className="header__link">Профиль</NavLink>
        </nav>
      </div>
    </header>
  );
};

export default Header;
