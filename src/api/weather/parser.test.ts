import { parseWeatherResponse } from './parser';
import { DEFAULT_WEATHER_RESPONSE } from '../../test-utils/mocks/weather';

describe('parseWeatherResponse', () => {
  it('parses a default response payload correcetly', () => {
    const expectedWeather = {
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
    };

    const parsedWeather = parseWeatherResponse(DEFAULT_WEATHER_RESPONSE);

    expect(parsedWeather).toEqual(expectedWeather);
  });
});
