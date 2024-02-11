// WeatherForecast.js
import React, { useEffect, useState } from 'react';
import './Weather.css';

const Weather = ({ city, setPage }) => {
  const [weatherData, setWeatherData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const apiKey = '6557810176c36fac5f0db536711a6c52';
    const apiUrl = 'https://api.openweathermap.org/data/2.5/forecast';

    const getWeatherData = async () => {
      try {
        const response = await fetch(`${apiUrl}?q=${city}&APPID=${apiKey}`);
        const data = await response.json();
        setWeatherData(data);
      } catch (error) {
        console.error('Error fetching weather data:', error);
        setError('Error fetching weather data. Please try again.');
      } finally {
        setLoading(false);
      }
    };

    getWeatherData();
  }, [city]);

  const formatTemperature = (kelvin) => {
    return `${(kelvin - 273.15).toFixed(2)}°C`;
  };

  const formatDate = (timestamp) => {
    const date = new Date(timestamp * 1000);
    return date.toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric' });
  };

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return (
      <div>
        <p className="error-message">{error}</p>
        <button onClick={() => setPage('input')}>Go Back</button>
      </div>
    );
  }

  return (
    <div className="mains">
    <div className="forecast-container">
      <h1 className='out'>{weatherData.city.name}, {weatherData.city.country}</h1>
      <div className="current-weather">
        <div className='temp'>
          <img src="https://i.pinimg.com/originals/b5/02/82/b502824fdd18a1d90e56266b55696180.gif" alt="Temperature" />
          <p>Temperature: {formatTemperature(weatherData.list[0].main.temp)}</p>
        </div>
        <div className='humi'>
          <img src="https://i.pinimg.com/originals/89/27/01/892701252dab9ead045f745d999cf9fc.gif" alt="Humidity" />
          <p>Humidity: {weatherData.list[0].main.humidity}%</p>
        </div>
        <div className='wind'>
          <img src="https://i.pinimg.com/originals/49/b1/12/49b112607606d501ee53dae5096cfe62.gif" alt="Wind Speed" />
          <p>Wind Speed: {weatherData.list[0].wind.speed} m/s</p>
        </div>
      </div>

      <h3 >3-Day Forecast:</h3>
      <ul className="forecast-list">
        {weatherData.list.slice(1, 4).map((forecast, index) => (
          <li key={index}>
            <strong>{formatDate(forecast.dt)}</strong>: {formatTemperature(forecast.main.temp)}
          </li>
        ))}
      </ul>
      <button onClick={() => setPage('input')}>HOME</button>
    </div>
    </div>
  );
};

export default Weather;
