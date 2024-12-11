import React, { useState, useEffect } from 'react';
import './App.css';

const Main = () => {

    const totalSupply = 871400000; // Total Supply of PepeCoin
    const [sliderPrice, setSliderPrice] = useState(0.00178); // Price per coin controlled by slider
    const [sharesOwned, setSharesOwned] = useState(''); // Shares owned entered by the user
    const [valueOfShares, setValueOfShares] = useState(null); // Value of shares

    // Load sharesOwned from localStorage on app load
    useEffect(() => {
        const storedShares = localStorage.getItem('sharesOwned');
        if (storedShares) {
            setSharesOwned(parseFloat(storedShares));
            // Recalculate value if there's a stored value and sliderPrice
            if (sliderPrice) {
                setValueOfShares(parseFloat(storedShares) * sliderPrice);
            }
        }
    }, [sliderPrice]);

    const handleSliderChange = (e) => {
        const price = parseFloat(e.target.value);
        setSliderPrice(price);

        // Recalculate value of shares
        if (sharesOwned) {
            const value = price * parseFloat(sharesOwned);
            setValueOfShares(value);
        }
    };

    const handleSharesChange = (e) => {
        const shares = parseFloat(e.target.value) || 0; // Default to 0 if the field is empty
        setSharesOwned(shares);

        // Save sharesOwned to localStorage
        localStorage.setItem('sharesOwned', shares);

        // Recalculate value of shares
        if (sliderPrice) {
            const value = sliderPrice * shares;
            setValueOfShares(value);
        }
    };

    return (
        <div class="App Main">
            <h1>PepeCoin Calculator</h1>
            <p>
                This tool is for holders of $PEP to calculate the value of their holdings. Adjust
                the price and input your shares to see your total asset value.
            </p>

            <p>Use the slider to adjust the price per coin and calculate your PepeCoin value.</p>

            <div style={{ maxWidth: '400px', margin: '0 auto' }}>
                <div className="form-group">
                    <label htmlFor="sharesOwned">Shares Owned:</label>
                    <input
                        type="number"
                        id="sharesOwned"
                        value={sharesOwned}
                        onChange={handleSharesChange}
                        placeholder="Enter shares owned"
                    />
                </div>

                <div className="form-group">
                    <label htmlFor="sliderPrice">Price per Coin ($):</label>
                    <input
                        type="range"
                        id="sliderPrice"
                        min="0.0005"
                        max="0.5"
                        step="0.0001"
                        value={sliderPrice}
                        onChange={handleSliderChange}
                    />
                    <p>
                        <strong>Selected Price per Coin:</strong> ${sliderPrice.toFixed(4)}
                    </p>
                </div>

                {valueOfShares !== null && (
                    <div className="result">
                        <p>
                            <strong>Value of Your Shares:</strong> ${valueOfShares.toFixed(2)}
                        </p>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Main;
