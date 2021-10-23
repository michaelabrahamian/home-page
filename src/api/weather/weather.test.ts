import { getImageURL, getWeather } from './weather';

describe('weather API', () => {
  describe('getWeather', () => {
    it('gets weather data from API and processes it correctly', async () => {
      const actualWeather = await getWeather('sydney');

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

      expect(actualWeather).toEqual(expectedWeather);
    });
  });

  describe('getImageURL', () => {
    it('returns the expected image URL', () => {
      const imageURL = getImageURL('code1');

      expect(imageURL).toMatchInlineSnapshot(
        `"http://openweathermap.org/img/wn/code1@2x.png"`
      );
    });
  });
});
