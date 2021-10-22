import { WeatherResponse } from '../../api/weather/types';

export const DEFAULT_WEATHER_RESPONSE: WeatherResponse = {
  coord: {
    lon: 151.2073,
    lat: -33.8679,
  },
  weather: [
    {
      id: 800,
      main: 'Clear',
      description: 'clear sky',
      icon: '01d',
    },
  ],
  base: 'stations',
  main: {
    temp: 291.96,
    feels_like: 292.09,
    temp_min: 289.68,
    temp_max: 294.32,
    pressure: 1013,
    humidity: 84,
  },
  visibility: 10000,
  wind: {
    speed: 2.24,
    deg: 90,
    gust: 2.68,
  },
  clouds: {
    all: 0,
  },
  dt: 1634938356,
  sys: {
    type: 2,
    id: 2001174,
    country: 'AU',
    sunrise: 1634929462,
    sunset: 1634976864,
  },
  timezone: 39600,
  id: 2147714,
  name: 'Sydney',
  cod: 200,
};
