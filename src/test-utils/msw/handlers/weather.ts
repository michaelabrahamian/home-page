import { graphql } from 'msw';
import { DEFAULT_WEATHER_RESPONSE } from '../../mocks/weather';

export const mockGetWeather = graphql.query('GetWeather', (_, res, ctx) =>
  res(ctx.data(DEFAULT_WEATHER_RESPONSE))
);
