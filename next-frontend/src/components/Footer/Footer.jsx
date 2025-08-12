import React from 'react';
import './Footer.module.css';

const Footer = () => {
  return (
    <footer className={footerMain}>
      <div className={footerContainer}>
        © {new Date().getFullYear()} Life storage
      </div>
    </footer>
  );
};

export default Footer;
