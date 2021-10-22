import { rest } from 'msw';
import { OPEN_WEATHER_MAP_WEATHER_API_URL } from '../../../api/weather/constants';
import { DEFAULT_WEATHER_RESPONSE } from '../../mocks/weather';

export const mockGetWeather = rest.get(
  OPEN_WEATHER_MAP_WEATHER_API_URL,
  (_, res, ctx) => res(ctx.json(DEFAULT_WEATHER_RESPONSE))
);
