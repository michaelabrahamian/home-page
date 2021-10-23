import axios, { AxiosRequestConfig } from 'axios';
import {
  OPEN_WEATHER_MAP_WEATHER_API_URL,
  OPEN_WEATHER_MAP_IMAGE_BASE_URL,
  OPEN_WEATHER_MAP_IMAGE_SUFFIX,
} from './constants';
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

export const getImageURL = (imageCode: string): string =>
  `${OPEN_WEATHER_MAP_IMAGE_BASE_URL}${imageCode}${OPEN_WEATHER_MAP_IMAGE_SUFFIX}`;
