import React, { useCallback, useEffect, useState } from 'react';
import debounce from 'lodash.debounce';
import ErrorOutlineIcon from '@mui/icons-material/ErrorOutline';
import { Button, Card, CircularProgress, Grid } from '@mui/material';
import { Box } from '@mui/system';
import { useQuery } from '@apollo/client';

import { GET_WEATHER, GET_WEATHER_VARIABLES } from '../../graphql/queries';
import { getImageURL } from '../../api/weather/image';
import { WeatherData, WeatherResponse } from '../../types/weather';
import { SectionHeading } from '../SectionHeading';
import { Temperature } from './Temperature';
import { Wind } from './Wind';
import { Humidity } from './Humidity';
import { LocationSearch } from './LocationSearch';

const boxStyles = {
  maxWidth: 600,
  margin: 'auto',
};

export const DEBOUNCE_SET_LOCATION_DELAY_MS = 500;

const WEATHER_LOCATION_STORAGE_KEY = 'weather-location';

export const WeatherWidget = () => {
  const INITIAL_WEATHER_LOCATION = localStorage.getItem(
    WEATHER_LOCATION_STORAGE_KEY
  );

  const [location, setLocation] = useState<string | null>(
    INITIAL_WEATHER_LOCATION ?? ''
  );
  const [locationSearch, setLocationSearch] = useState(
    INITIAL_WEATHER_LOCATION ?? ''
  );
  const [showLocationSearch, setShowLocationSearch] = useState(
    !INITIAL_WEATHER_LOCATION
  );

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const debouncedSetLocation = useCallback(
    debounce((locationSearch) => {
      setLocation(locationSearch);
      localStorage.setItem(WEATHER_LOCATION_STORAGE_KEY, locationSearch);
    }, DEBOUNCE_SET_LOCATION_DELAY_MS),
    []
  );

  useEffect(() => {
    debouncedSetLocation(locationSearch);
  }, [locationSearch, debouncedSetLocation]);

  return (
    <Box sx={boxStyles}>
      <Card variant="outlined">
        <div style={{ position: 'relative' }}>
          Testing a change
          <SectionHeading
            testId="weather-section-heading"
            heading={location || 'Weather'}
            headingStyles={{ display: 'inline-block' }}
          />
          {showLocationSearch ? (
            <>
              <br />
              <LocationSearch
                searchValue={locationSearch}
                setSearchValue={setLocationSearch}
              />
              <br />
            </>
          ) : (
            <Button
              variant="text"
              onClick={() => setShowLocationSearch(true)}
              style={{ float: 'right', position: 'absolute', right: 0 }}
            >
              change
            </Button>
          )}
        </div>

        <WeatherContent
          location={location}
          onSuccessfulWeatherQuery={() => setShowLocationSearch(false)}
        />
      </Card>
    </Box>
  );
};

type WeatherContentProps = {
  location: string | null;
  onSuccessfulWeatherQuery: () => void;
};

const WeatherContent = ({
  location,
  onSuccessfulWeatherQuery,
}: WeatherContentProps) => {
  const { loading, error, data } = useQuery<
    WeatherResponse,
    GET_WEATHER_VARIABLES
  >(GET_WEATHER, {
    variables: {
      location: location ?? '',
    },
    skip: !location,
  });

  const isSuccess = !loading && !error && data;

  // remove the location search bar after a successful search
  useEffect(() => {
    if (isSuccess) {
      onSuccessfulWeatherQuery();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isSuccess]);

  if (loading) {
    return <CircularProgress />;
  }

  if (error) {
    return (
      <span>
        <ErrorOutlineIcon /> Unable to get weather details
      </span>
    );
  }

  if (!data || !data.weather) {
    return null;
  }

  return <WeatherDetails weather={data.weather} />;
};

type WeatherDetailsProps = {
  weather: WeatherData;
};

export const WeatherDetails = ({ weather }: WeatherDetailsProps) => (
  <Grid container justifyContent="space-around">
    <Grid item sx={{ textAlign: 'left' }}>
      <Temperature temperature={weather.temperature.average} />
      <Wind windSpeedMetresPerSecond={weather.windSpeed} />
      <Humidity humidity={weather.humidity} />
    </Grid>

    <Grid item sx={{ textAlign: 'center' }}>
      <img
        src={getImageURL(weather.icon)}
        alt={weather.shortDescription}
        width="80px"
      />
      <p style={{ margin: 0 }}>{weather.longDescription}</p>
    </Grid>
  </Grid>
);
