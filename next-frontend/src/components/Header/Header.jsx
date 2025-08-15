"use client";

import React, { useContext } from "react";
import Link from "next/link";
import { getCurrentWeekStart } from "../../utils/getCurrentWeekStart";
import styles from "./Header.module.css";
import { WeeksContext } from "../../context/WeeksContext";

const Header = () => {
  const weekStart = getCurrentWeekStart();
  const { future, past } = useContext(WeeksContext);

  return (
    <header className={styles.headerMain}>
      <div className={styles.headerContainer}>
        <div className={styles.headerLogo}>
          <strong>Life</strong> storage
        </div>
        <nav className={styles.headerNav}>
          <Link href="/" className={styles.headerLink}>Календарь жизни</Link>
          <Link href={`/week/${weekStart}`} className={styles.headerLink}>Текущая неделя</Link>
          <Link href="/profile" className={styles.headerLink}>Профиль</Link>
        </nav>
      </div>
    </header>
  );
};

export default Header;
