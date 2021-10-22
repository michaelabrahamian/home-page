import { getWeather } from "./weather";
import { parseWeatherResponse } from "./parser";
import { DEFAULT_WEATHER_RESPONSE } from "../../test-utils/mocks/weather";

describe("weather API", () => {
  describe("parseWeatherResponse", () => {
    it("parses a default response payload correcetly", () => {
      const expectedWeather = {
        shortDescription: "Clear",
        longDescription: "clear sky",
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

  describe("getWeather", () => {
    it("gets weather data from API and processes it correctly", async () => {
      const actualWeather = await getWeather("sydney");

      const expectedWeather = {
        shortDescription: "Clear",
        longDescription: "clear sky",
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
