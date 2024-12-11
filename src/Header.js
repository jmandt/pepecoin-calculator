import React from 'react';
import './App.css';

const Header = () => {
  
  return (
    <header className="App-header">
       <img
        src="https://pepecoin.org/assets/img/brand-assets/Pepecoin_noBackground_RGB%20[Converted].svg"
        className="App-logo"
        alt="logo"
      />
      <span style={{ fontSize: "40px" }}>calculator</span>
    </header>
  );
};

export default Header;
