import React from 'react';
import './Footer.css';

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer__container">
        © {new Date().getFullYear()} Life storage
      </div>
    </footer>
  );
};

export default Footer;
