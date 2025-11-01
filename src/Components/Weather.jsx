import React, { useEffect, useRef, useState } from 'react';
import search from '../assets/search.png';
import humidity from '../assets/humidity.png';
import wind from '../assets/wind.png';
import clearnight from '../assets/clear-night.svg';
import clear from '../assets/clear.svg';
import drizzle from '../assets/drizzle.svg';
import fognight from '../assets/fog-night.svg';
import fog from '../assets/fog.svg';
import hail from '../assets/hail.svg';
import heavydrizzle from '../assets/heavy-drizzle.svg';
import heavyhail from '../assets/heavy-hail.svg';
import heavyrainshowers from '../assets/heavy-rain-showers.svg';
import heavyrain from '../assets/heavy-rain.svg';
import heavysnowshowers from '../assets/heavy-snow-showers.svg';
import heavysnow from '../assets/heavy-snow.svg';
import lightdrizzle from '../assets/light-drizzle.svg';
import lightsnownight from '../assets/light-snow-night.svg';
import lightsnowshowers from '../assets/light-snow-showers.svg';
import lightsnow from '../assets/light-snow.svg';
import overcast from '../assets/overcast.svg';
import partlycloudynight from '../assets/partly-cloudy-night.svg';
import partlycloudy from '../assets/partly-cloudy.svg';
import rainshowers from '../assets/rain-showers.svg';
import rain from '../assets/rain.svg';
import rimefog from '../assets/rime-fog.svg';
import slightrainnight from '../assets/slight-rain-night.svg';
import slightrainshowersnight from '../assets/slight-rain-showers-night.svg';
import slightrainshowers from '../assets/slight-rain-showers.svg';
import slightrain from '../assets/slight-rain.svg';
import snowgrains from '../assets/snow-grains.svg';
import snow from '../assets/snow.svg';
import thunderstorm from '../assets/thunderstorm.svg';
import './Weather.css';

export const Weather = () => {
  const inputRef = useRef();
  const [weatherData, setWeatherData] = useState(null);
  const [error, setError] = useState('');

  // === WEATHER CONDITION MAP ===
  const allIcons = {
    0: { name: 'Clear Sky', icons: { day: clear, night: clearnight } },
    1: { name: 'Mainly Clear', icons: { day: clear, night: clearnight } },
    2: { name: 'Partly Cloudy', icons: { day: partlycloudy, night: partlycloudynight } },
    3: { name: 'Overcast', icons: { day: overcast, night: overcast } },
    45: { name: 'Fog', icons: { day: fog, night: fognight } },
    48: { name: 'Rime Fog', icons: { day: rimefog, night: rimefog } },
    61: { name: 'Slight Rain', icons: { day: slightrain, night: slightrainnight } },
    63: { name: 'Moderate Rain', icons: { day: rain, night: rain } },
    65: { name: 'Heavy Rain', icons: { day: heavyrain, night: heavyrain } },
    71: { name: 'Slight Snowfall', icons: { day: lightsnow, night: lightsnownight } },
    73: { name: 'Moderate Snowfall', icons: { day: snow, night: snow } },
    75: { name: 'Heavy Snowfall', icons: { day: heavysnow, night: heavysnow } },
    95: { name: 'Thunderstorm', icons: { day: thunderstorm, night: thunderstorm } },
  };

  // === FETCH LOCATION DATA ===
  const getLocation = async (location) => {
    const res = await fetch(
      `https://geocoding-api.open-meteo.com/v1/search?name=${location}&count=1&language=en&format=json`
    );
    const data = await res.json();
    if (!data.results || data.results.length === 0) throw new Error('Location not found');
    const result = data.results[0];
    return {
      name: result.name,
      lat: result.latitude,
      lon: result.longitude,
    };
  };

  // === FETCH WEATHER DATA ===
  const getWeather = async (location) => {
    const { lat, lon, name } = await getLocation(location);
    const res = await fetch(
      `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&current=temperature_2m,relative_humidity_2m,is_day,weather_code,wind_speed_10m`
    );
    const data = await res.json();
    return {
      name,
      current: data.current,
    };
  };

  // === MAIN SEARCH FUNCTION ===
  const searcher = async (city) => {
  if (!city) return;

  try {
    // Step 1: Get location details (latitude & longitude)
    const geoRes = await fetch(
      `https://geocoding-api.open-meteo.com/v1/search?name=${city}&count=1&language=en&format=json`
    );
    const geoData = await geoRes.json();

    if (!geoData.results || geoData.results.length === 0) {
      alert("Location not found");
      return;
    }

    const { latitude, longitude, name } = geoData.results[0];

    // Step 2: Fetch weather details
    const weatherRes = await fetch(
      `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current=temperature_2m,relative_humidity_2m,is_day,weather_code,wind_speed_10m`
    );
    const weatherData = await weatherRes.json();

    const current = weatherData.current;
    const weatherCode = current.weather_code;
    const weatherCondition = allIcons[weatherCode] || allIcons[0]; // fallback if code not found

    const iconPath = 
      current.is_day ? weatherCondition.icons.day : weatherCondition.icons.night;

    setWeatherData({
      location: name,
      temperature: current.temperature_2m,
      humidity: current.relative_humidity_2m,
      windSpeed: current.wind_speed_10m,
      icon: iconPath,
    });
  } catch (err) {
    console.error("Error fetching weather data:", err);
    alert("Failed to fetch weather data");
  }
};

  // === AUTO LOAD DEFAULT CITY ===
  useEffect(() => {
    searcher('Chennai');
  }, []);

  return (
    <div className="weather">
      <div className="search_bar">
        <input ref={inputRef} type="text" placeholder="Search city..." />
        <img
          src={search}
          alt="search"
          onClick={() => searcher(inputRef.current.value)}
          style={{ cursor: 'pointer' }}
        />
      </div>

      {error && <p className="error">{error}</p>}

      {weatherData ? (
        <>
          <img src={weatherData.icon} alt="weather" className="weather_icon" />
          <p className="temperature">{weatherData.temperature} °C</p>
          <p className="location">{weatherData.location}</p>
          <p className="condition">{weatherData.condition}</p>

          <div className="weather_data">
            <div className="col">
              <img src={humidity} alt="humidity" />
              <div>
                <p>{weatherData.humidity} %</p>
                <span>Humidity</span>
              </div>
            </div>
            <div className="col">
              <img src={wind} alt="wind" />
              <div>
                <p>{weatherData.windSpeed} km/h</p>
                <span>Wind Speed</span>
              </div>
            </div>
          </div>
        </>
      ) : (
        !error && <p>Loading...</p>
      )}
    </div>
  );
};
