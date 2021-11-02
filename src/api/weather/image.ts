import {
  OPEN_WEATHER_MAP_IMAGE_BASE_URL,
  OPEN_WEATHER_MAP_IMAGE_SUFFIX,
} from './constants';

export const getImageURL = (imageCode: string): string =>
  `${OPEN_WEATHER_MAP_IMAGE_BASE_URL}/${imageCode}${OPEN_WEATHER_MAP_IMAGE_SUFFIX}`;
