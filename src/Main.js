import React, { useState, useEffect } from 'react';
import './App.css';

const Main = () => {
  const totalSupply = 87212829479; // Total Supply of PepeCoin
  const [activeTab, setActiveTab] = useState('price'); // Tracks the active tab ('price' or 'marketCap')
  const [sliderPrice, setSliderPrice] = useState(0.00178); // Price per coin controlled by slider
  const [marketCap, setMarketCap] = useState(null); // Market cap input
  const [sharesOwned, setSharesOwned] = useState(''); // Shares owned entered by the user
  const [valueOfShares, setValueOfShares] = useState(null); // Value of shares
  const [, setIsUpdatingMarketCap] = useState(false); // Tracks if market cap is being updated

// Load sharesOwned and marketCap from localStorage on app load
  useEffect(() => {
    const storedShares = localStorage.getItem('sharesOwned');
    const storedMarketCap = localStorage.getItem('marketCap');

    if (storedShares) {
      setSharesOwned(parseFloat(storedShares));
    }

    if (storedMarketCap) {
      const cap = parseFloat(storedMarketCap);
      setMarketCap(cap);

      // Only set sliderPrice if the market cap is loaded from localStorage
      setSliderPrice(cap / totalSupply);
    }

    if (storedShares && sliderPrice) {
      setValueOfShares(parseFloat(storedShares) * sliderPrice);
    }
  }, []);

  const handleSliderChange = (e) => {
    const price = parseFloat(e.target.value);
    setSliderPrice(price);

    // Recalculate market cap based on the slider price
    setMarketCap(price * totalSupply);

    if (sharesOwned) {
      setValueOfShares(price * parseFloat(sharesOwned));
    }
  };

  const handleMarketCapChange = (e) => {
    const cap = parseFloat(e.target.value) || 0;
    setMarketCap(cap);

    // Indicate that market cap is being manually updated
    setIsUpdatingMarketCap(true);

    // Save marketCap to localStorage
    localStorage.setItem('marketCap', cap);

    // Recalculate sliderPrice based on market cap
    const price = cap / totalSupply;
    setSliderPrice(price);

    if (sharesOwned) {
      setValueOfShares(price * parseFloat(sharesOwned));
    }
  };

  const handleSharesChange = (e) => {
    const shares = parseFloat(e.target.value) || 0;
    setSharesOwned(shares);

    // Save sharesOwned to localStorage
    localStorage.setItem('sharesOwned', shares);

    if (activeTab === 'price' && sliderPrice) {
      setValueOfShares(sliderPrice * shares);
    } else if (activeTab === 'marketCap' && marketCap) {
      const price = marketCap / totalSupply;
      setSliderPrice(price);
      setValueOfShares(price * shares);
    }
  };

// Reset the isUpdatingMarketCap flag when switching tabs or after updates
  useEffect(() => {
    if (activeTab === 'price') {
      setIsUpdatingMarketCap(false);
    }
  }, [activeTab]);

  return (
    <div className="App Main">
    <div className="tabs">
      <button
        className={activeTab === 'price' ? 'active' : ''}
        onClick={() => setActiveTab('price')}
      >
        Based on Price
      </button>
      <button
        className={activeTab === 'marketCap' ? 'active' : ''}
        onClick={() => setActiveTab('marketCap')}
      >
        Based on Market Cap
      </button>
    </div>

    <p>
      This tool is for holders of $PEP to calculate the value of their holdings. Switch
      between price or market cap calculations to play with different scenarios.
    </p>

    <div style={{maxWidth: '400px', margin: '0 auto'}}>
      <div className="form-group">
        <label htmlFor="sharesOwned">Shares Owned:</label>
        <input
          type="text"
          id="sharesOwned"
          value={sharesOwned !== '' ? parseFloat(sharesOwned).toLocaleString('en-US') : ''}
          onChange={(e) => {
            // Remove commas for parsing the input value
            const cleanedValue = e.target.value.replace(/,/g, '');
            handleSharesChange({ target: { value: cleanedValue } });
          }}
          placeholder="Enter shares owned"
        />
      </div>

      {activeTab === 'price' && (<div className="form-group">
        <label htmlFor="sliderPrice">Price per Coin ($):</label>
        <input
          type="range"
          id="sliderPrice"
          min="0.0005"
          max="0.5"
          step="0.00001"
          value={sliderPrice}
          onChange={handleSliderChange}
        />
        <p>
          <strong>Selected Price per Coin:</strong> ${sliderPrice.toLocaleString('en-US', { minimumFractionDigits: 4, maximumFractionDigits: 6 })}
        </p>
      </div>)}

      {activeTab === 'marketCap' && (<div className="form-group">
        <label htmlFor="marketCap">Market Cap ($):</label>
        <input
          type="text"
          id="marketCap"
          value={marketCap !== null ? marketCap.toLocaleString('en-US') : ''}
          onChange={(e) => {
            // Remove commas from the input value for parsing
            const cleanedValue = e.target.value.replace(/,/g, '');
            handleMarketCapChange({ target: { value: cleanedValue } });
          }}
          placeholder="Enter market cap"
        />
        <p>
          <strong>Calculated Price per Coin:</strong> ${sliderPrice.toLocaleString('en-US', { minimumFractionDigits: 4, maximumFractionDigits: 4 })}
        </p>
      </div>)}

      {valueOfShares !== null && (<div className="result">
        <p>
          <strong>Value of Your Shares:</strong> ${valueOfShares.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
        </p>
      </div>)}
    </div>
  </div>);

};

export default Main;
