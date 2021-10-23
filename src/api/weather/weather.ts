import axios, { AxiosRequestConfig } from 'axios';
import { OPEN_WEATHER_MAP_WEATHER_API_URL } from './constants';
import { WeatherFormatted, WeatherResponse } from './types';
import { parseWeatherResponse } from './parser';

const UNIT = 'metric';

export const getWeather = async (query: string): Promise<WeatherFormatted> => {
  const config: AxiosRequestConfig = {
    params: {
      q: query,
      appid: process.env.REACT_APP_OPEN_WEATHER_API_KEY,
      units: UNIT,
    },
  };

  const weatherResponse = await axios.get<WeatherResponse>(
    OPEN_WEATHER_MAP_WEATHER_API_URL,
    config
  );

  return parseWeatherResponse(weatherResponse.data);
};
