"use client";

import React from 'react';
import { NavLink } from 'react-router-dom';
import { getCurrentWeekStart } from '../../utils/getCurrentWeekStart' 
import styles from './Header.module.css';


const Header = () => {
  const weekStart = getCurrentWeekStart()

  return (
    <header className={styles.headerMain}>
      <div className={styles.headerContainer}>
        <div className={styles.headerLogo}>
          <strong>Life</strong> storage
        </div>
        <nav className={styles.headerNav}>
          <NavLink to="/" className={styles.headerLink}>Календарь жизни</NavLink>
          <NavLink to={`/week/${weekStart}`} className={styles.headerLink}>Текущая неделя</NavLink>
          <NavLink to="/profile" className={styles.headerLink}>Профиль</NavLink>
        </nav>
      </div>
    </header>
  );
};

export default Header;
