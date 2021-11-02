export type WeatherResponse = {
  weather: WeatherData;
};

export type WeatherData = {
  location: string;
  icon: string;
  shortDescription: string;
  longDescription: string;
  temperature: {
    average: number;
    min: number;
    max: number;
    feelsLike: number;
  };
  windSpeed: number;
  humidity: number;
};
