import { useEffect, useState } from 'react';
import { getWeather } from '../api/weather/weather';

export const Weather = () => {
  const [weather, setWeather] = useState('loading...');

  useEffect(() => {
    async function fetchWeather() {
      try {
        const fetchedWeather = await getWeather('sydney');
        setWeather(fetchedWeather.longDescription);
      } catch (error) {
        console.log('error', error);
      }
    }
    fetchWeather();
  }, []);

  return <div>Weather: {weather}</div>;
};
