import React, { useCallback, useEffect } from 'react';
import debounce from 'lodash.debounce';
import ErrorOutlineIcon from '@mui/icons-material/ErrorOutline';
import { Button, Card, CircularProgress, Grid, TextField } from '@mui/material';
import { Box } from '@mui/system';
import { useQuery } from 'react-query';
import { getImageURL, getWeather } from '../../api/weather/weather';
import { SectionHeading } from '../SectionHeading';
import { Temperature } from './Temperature';
import { Wind } from './Wind';
import { Humidity } from './Humidity';
import { useState } from 'react';
import { WeatherFormatted } from '../../api/weather/types';

const boxStyles = {
  maxWidth: 600,
  margin: 'auto',
};

const DEBOUNCE_SET_LOCATION_DELAY_MS = 500;

export const Weather = () => {
  const [location, setLocation] = useState<string | null>('');
  const [locationSearch, setLocationSearch] = useState('');
  const [showLocationSearch, setShowLocationSearch] = useState(true);

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const debouncedSetLocation = useCallback(
    debounce(
      (locationSearch) => setLocation(locationSearch),
      DEBOUNCE_SET_LOCATION_DELAY_MS
    ),
    []
  );

  useEffect(() => {
    debouncedSetLocation(locationSearch);
  }, [locationSearch, debouncedSetLocation]);

  return (
    <Box sx={boxStyles}>
      <Card variant="outlined">
        <div style={{ position: 'relative' }}>
          <SectionHeading
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
          setShowLocationSearch={setShowLocationSearch}
        />
      </Card>
    </Box>
  );
};

type WeatherContentProps = {
  location: string | null;
  setShowLocationSearch: React.Dispatch<React.SetStateAction<boolean>>;
};

const WeatherContent = ({
  location,
  setShowLocationSearch,
}: WeatherContentProps) => {
  const { isLoading, isError, isSuccess, data } = useQuery(
    ['weather', location],
    () => getWeather(location ?? ''),
    {
      enabled: !!location,
    }
  );

  // remove the locations earch bar after a successful search
  useEffect(() => {
    if (isSuccess) {
      setShowLocationSearch(false);
    }
  }, [isSuccess, setShowLocationSearch]);

  if (isLoading) {
    return <CircularProgress />;
  }

  if (isError) {
    return (
      <span>
        <ErrorOutlineIcon /> Unable to get weather details
      </span>
    );
  }

  if (!data) {
    return null;
  }

  return <WeatherDetails weather={data} />;
};

type LocationSearchProps = {
  searchValue: string;
  setSearchValue: React.Dispatch<React.SetStateAction<string>>;
};

const LocationSearch = ({
  searchValue,
  setSearchValue,
}: LocationSearchProps) => (
  <TextField
    label="Location"
    id="location"
    variant="standard"
    style={{ width: '80%', marginBottom: 10 }}
    value={searchValue}
    onChange={(event) => setSearchValue(event.target.value)}
  />
);

type WeatherDetailsProps = {
  weather: WeatherFormatted;
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
