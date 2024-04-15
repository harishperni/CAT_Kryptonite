// Navbar.js
import React from 'react';
import './Navbar.css';
import caterpillarLogo from '/Users/harishperni/test-app/client/src/components/caterpillar_logo.png';

const Navbar = () => {
  return (
    <header className="Navbar">
      <img src={caterpillarLogo} alt="Caterpillar Logo" />
      {/* Add navigation links or logo here */}
    </header>
  );
}

export default Navbar;
