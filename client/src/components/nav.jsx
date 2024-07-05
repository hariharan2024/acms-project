import React, { useState } from 'react';
import { Link } from 'react-router-dom';

function Nav() {
  // State to manage the visibility of the mobile menu
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // Handler function to toggle the mobile menu
  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <div className="header">
      <h1 style={{ color: "white", fontFamily: "cursive", fontSize: "30px" }}>acms admin panel</h1>
      
      {/* Mobile Menu Toggle Button */}
      <div className="mobile-menu-toggle" onClick={toggleMobileMenu}>
        ☰
      </div>

      {/* Navigation Links */}
      <nav className={isMobileMenuOpen ? 'navbar mobile-menu-open' : 'navbar'}>
        <div className="nav-links">
          <Link to="/dash">Home</Link>
          <Link to="/reviewpage">Review</Link>
          <Link to="/cust">Customer</Link>
          <Link to="/order">Order History</Link>
          <Link to="/preproduct">Preorder</Link>
          <Link to="/prehis">Preorder History</Link>
          <Link to="/staff">Staff</Link>
          <Link to="/food">Food</Link>
          <Link to="/alogin">Logout</Link>
        </div>
      </nav>
    </div>
  );
}

export default Nav;
