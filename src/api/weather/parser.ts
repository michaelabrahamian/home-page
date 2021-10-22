import { WeatherFormatted, WeatherResponse } from "./types";

export const parseWeatherResponse = (
  weatherResponse: WeatherResponse
): WeatherFormatted => ({
  shortDescription: weatherResponse.weather[0]?.main ?? "",
  longDescription: weatherResponse.weather[0]?.description ?? "",
  temperature: {
    average: weatherResponse.main.temp,
    min: weatherResponse.main.temp_min,
    max: weatherResponse.main.temp_max,
    feelsLike: weatherResponse.main.feels_like,
  },
});
