// CityInput.js
import React, { useState } from 'react';

import './City.css';
// import Weather from './Weather';

const City = ({ setCity, setPage }) => {
  const [inputCity, setInputCity] = useState('');

  const handleGetForecast = () => {
    setCity(inputCity);
    setPage('forecast');
  };

  return (
    <div className="main">
      <div className="title">
      Weather Forecast
      </div>
    <div className="city-input-container">
      <h1 style={{color:"white"}}>Enter City</h1>
      <label>
        
        <input
          type="text"
          value={inputCity}
          onChange={(e) => setInputCity(e.target.value)}
          required
        />
      </label>
      <button onClick={handleGetForecast}>Get Forecast</button>
    </div>
    </div>
  );
};

export default City;
