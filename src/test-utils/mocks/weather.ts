import { WeatherResponse } from '../../types/weather';

export const DEFAULT_WEATHER_RESPONSE: WeatherResponse = {
  weather: {
    humidity: 60,
    icon: '01d',
    location: 'Sydney',
    longDescription: 'clear sky',
    shortDescription: 'Clear',
    temperature: {
      average: 27.62,
      feelsLike: 28.9,
      max: 31.86,
      min: 22.9,
    },
    windSpeed: 5.36,
  },
};
