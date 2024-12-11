import React from 'react';
import './App.css';

const Footer = () => {
    return (
        <footer className="Footer">
            <div className="footer-links">
                <a href="https://pepecoin.org/" target="_blank" rel="noopener noreferrer">
                    Official Website
                </a>
                {" | "}
                <a
                    href="https://www.reddit.com/r/pepecoin"
                    target="_blank"
                    rel="noopener noreferrer"
                >
                    Reddit
                </a>
                {" | "}
                <a
                    href="https://coinmarketcap.com/currencies/pepecoin-org/"
                    target="_blank"
                    rel="noopener noreferrer"
                >
                    CoinMarketCap
                </a>
            </div>
            <img
                src="https://pepecoin.org/assets/img/brand-assets/Pepecoin_onWhite_IconOnly-RGB%20[Converted].svg"
                className="footer-logo"
                alt="PepeCoin Logo"
            />
        </footer>
    );
};

export default Footer;
