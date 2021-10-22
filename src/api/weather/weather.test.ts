import { getWeather } from './weather';

describe('weather API', () => {
  describe('getWeather', () => {
    it('gets weather data from API and processes it correctly', async () => {
      const actualWeather = await getWeather('sydney');

      const expectedWeather = {
        shortDescription: 'Clear',
        longDescription: 'clear sky',
        temperature: {
          average: 291.96,
          min: 289.68,
          max: 294.32,
          feelsLike: 292.09,
        },
      };

      expect(actualWeather).toEqual(expectedWeather);
    });
  });
});
