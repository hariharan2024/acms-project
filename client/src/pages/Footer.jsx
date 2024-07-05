import React from "react";
import { Link } from "react-router-dom";
import '@fortawesome/fontawesome-free/css/all.css';



const Footer = () => {
  return (
    <footer className="footer">
      <div className="share">
        <a href="#" className="fab fa-facebook-f"> </a>
        <a href="#" className="fab fa-twitter"></a>
        <a href="#" className="fab fa-instagram"></a>
        <a href="#" className="fab fa-linkedin"></a>
        <a href="#" className="fab fa-pinterest"></a>
      </div>
      {/* <div className="links">
        <Link to="/">home</Link>
        <Link to="/about">about</Link>
        <Link to="/menu">menu</Link>
        <Link to="/products">products</Link>
        <Link to="/review">review</Link>
        <Link to="/contact">contact</Link>
        <Link to="/blogs">blogs</Link>
      </div> */}
      <div className="credit">
        created by <span>acms</span> | all rights reserved
      </div>
    </footer>
  );
};

export default Footer;

