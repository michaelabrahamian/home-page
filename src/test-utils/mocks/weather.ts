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
    temp: 27.62,
    feels_like: 28.9,
    temp_min: 22.9,
    temp_max: 31.86,
    pressure: 1010,
    humidity: 60,
  },
  visibility: 10000,
  wind: {
    speed: 5.36,
    deg: 90,
    gust: 5.81,
  },
  clouds: {
    all: 0,
  },
  dt: 1634954011,
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
