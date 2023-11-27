import React from 'react';
import { useLocation } from 'react-router-dom';
import { DateTime } from 'luxon';
import { WiDaySunny, WiCloud, WiDayRain, WiDaySnow } from 'weather-icons-react';
import './HourlyForecast.css';

const HourlyForecast = () => {
  const location = useLocation();
  const { data,da } = location.state;
  const date = DateTime.fromISO(da, { zone: 'America/New_York' });

        const dayName = new Intl.DateTimeFormat('en-US', { weekday: 'long' }).format(date);
        const monthName = new Intl.DateTimeFormat('en-US', { month: 'short' }).format(date);

  
  function convertTimestampToESTTime(timestamp) {
    const estOffset = -5 * 60 * 60; // Eastern Standard Time (EST) offset in seconds
    const estTimestamp = timestamp + estOffset;
    const date = new Date(estTimestamp * 1000);
    const hours = date.getUTCHours().toString().padStart(2, '0');
    const minutes = date.getUTCMinutes().toString().padStart(2, '0');
    const seconds = date.getUTCSeconds().toString().padStart(2, '0');
    return `${hours}:${minutes}:${seconds}`;
  }
  const getWeatherIcon = (condition) => {
    switch (condition) {
      case 'Clear':
        return <WiDaySunny />;
      case 'Rain':
        return <WiDayRain />;
      case 'Clouds':
        return <WiCloud />;
      case 'Snow':
        return <WiDaySnow />;
      default:
        return null;
    }
  };

  return (
    <div className="hourly-forecast-container">
      <h3>{`${dayName}, ${monthName} ${date.c.day}`}</h3>
      {data.map((item, index) => {
        return (
          <div key={index} className="hourly-card">
            <h2>{getWeatherIcon(item.weather[0].main)}</h2>
            <p>Time: {convertTimestampToESTTime(item.dt)}</p>
            <p>Temperature: {item.main.temp}</p>
            <p>Feels Like: {item.main.feels_like}</p>
            <p>Description: {item.weather[0].description}</p>
          </div>
        );
      })}
      <br />
    </div>
  );
};

export default HourlyForecast;
