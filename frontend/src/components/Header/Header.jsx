import React from 'react';
import { Link } from 'react-router-dom';
import './Header.css';

const Header = () => {
  return (
    <header className="header">
      <div className="header__container">
        <div className="header__logo">
          <strong>Life</strong> storage
        </div>
        <nav className="header__nav">
          <Link to="/" className="header__link">Календарь жизни</Link>
          <Link to="/profile" className="header__link">Профиль</Link>
        </nav>
      </div>
    </header>
  );
};

export default Header;
