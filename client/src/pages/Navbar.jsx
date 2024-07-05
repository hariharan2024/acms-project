import React, { useState, useContext } from "react";
import { Link } from "react-router-dom";
import Cart from "../components/cart.jsx";
import '@fortawesome/fontawesome-free/css/all.css';
import { AuthContext } from "../context/authcontext";


const Navbar = ({ cartItems, removeFromCart, calculateTotal ,handleCheckNow}) => {
  const { currentUser, logout } = useContext(AuthContext);
  const [isCartVisible, setIsCartVisible] = useState(false);
  const [isNavVisible, setIsNavVisible] = useState(false); // State to manage navbar visibility

  const toggleCartVisibility = () => {
    setIsCartVisible(!isCartVisible);
  };

  const toggleNavVisibility = () => {
    setIsNavVisible(!isNavVisible);
  };

  return (
    <>
      <header className="header">
        <Link to="/" className="logo">
          <h1 style={{ color: "white", fontFamily: "cursive", fontSize: "30px" }}>acms</h1>
        </Link>
        <nav className={`navbar ${isNavVisible ? 'active' : 'fas fa bars'}`}>
        <div className="menu-toggle" onClick={toggleNavVisibility}>
  <i className={`fas ${isNavVisible ? 'fa-times' : 'fa-bars'}`}></i>
</div>

          <div className="nav-links">
            <Link to="/">home</Link>
            <Link to="/about">about</Link>
            <Link to="/menu">menu</Link>
            <Link to="/products">products</Link>
            <Link to="/review">reviews</Link>
            {currentUser && (
              <Link to="/corders">order history</Link>
              
              
            )}
              {currentUser && (
              <Link to="/preorder">pre-order history</Link>
              
              
            )}
            {currentUser ? (
              <a onClick={logout}><i className="fas fa-sign-out-alt"></i></a>
            ) : (
              <Link to="/login"><i className="fas fa-sign-in-alt"></i></Link>
            )}
            {/* Add button to toggle cart visibility */}
            <a onClick={toggleCartVisibility}><i className="fas fa-shopping-cart"></i></a>
          </div>
        </nav>
      </header>
      {/* Render Cart component based on visibility state */}
      {isCartVisible && (
        <Cart
          cartItems={cartItems}
          removeFromCart={removeFromCart}
          calculateTotal={calculateTotal}
          handleCheckNow={handleCheckNow}
        />
      )}
    </>
  );
};

export default Navbar;
