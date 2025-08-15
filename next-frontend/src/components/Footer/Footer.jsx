"use client";

import React from "react";
import styles from "./Footer.module.css";

const Footer = () => {
  return (
    <footer className={styles.footerMain}>
      <div className={styles.footerContainer}>
        © {new Date().getFullYear()} Life storage
      </div>
    </footer>
  );
};

export default Footer;
