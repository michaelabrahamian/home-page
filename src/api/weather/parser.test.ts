import { parseWeatherResponse } from './parser';
import { DEFAULT_WEATHER_RESPONSE } from '../../test-utils/mocks/weather';

describe('parseWeatherResponse', () => {
  it('parses a default response payload correcetly', () => {
    const expectedWeather = {
      location: 'Sydney',
      shortDescription: 'Clear',
      longDescription: 'clear sky',
      temperature: {
        average: 291.96,
        min: 289.68,
        max: 294.32,
        feelsLike: 292.09,
      },
    };

    const parsedWeather = parseWeatherResponse(DEFAULT_WEATHER_RESPONSE);

    expect(parsedWeather).toEqual(expectedWeather);
  });
});
