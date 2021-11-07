import { gql } from '@apollo/client';

export type GET_WEATHER_VARIABLES = {
  location: String;
};

export const GET_WEATHER = gql`
  query GetWeather($location: String) {
    weather(location: $location) {
      location
      icon
      shortDescription
      longDescription
      windSpeed
      humidity
      temperature {
        average
        max
        feelsLike
        min
      }
    }
  }
`;

export type GET_NEWS_VARIABLES = {
  query: String;
};

export const GET_NEWS = gql`
  query GetNews($query: String) {
    news(query: $query) {
      results {
        id
        title
        url
        publicationDate
        category
      }
    }
  }
`;
