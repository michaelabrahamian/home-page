import React from 'react';
import {
  Autocomplete,
  Button,
  Card,
  CircularProgress,
  Grid,
  TextField,
} from '@mui/material';
import { Box } from '@mui/system';
import { useQuery } from 'react-query';
import { getImageURL, getWeather } from '../../api/weather/weather';
import { SectionHeading } from '../SectionHeading';
import { Temperature } from './Temperature';
import { Wind } from './Wind';
import { Humidity } from './Humidity';
import { useState } from 'react';
import { WeatherFormatted } from '../../api/weather/types';

const locationOptions = [
  'Sydney',
  'Campbelltown',
  'Yerevan',
  'Moscow',
  'Camden',
  'Melbourne',
  'Darwin',
];

export const Weather = () => {
  const [location, setLocation] = useState<string | null>(null);

  const boxStyles = {
    maxWidth: 600,
    margin: 'auto',
  };

  return (
    <Box sx={boxStyles}>
      <Card variant="outlined">
        <div style={{ position: 'relative' }}>
          <SectionHeading
            heading={location ?? 'Weather'}
            headingStyles={{ display: 'inline-block' }}
          />
          {location && (
            <Button
              variant="text"
              onClick={() => setLocation(null)}
              style={{ float: 'right', position: 'absolute', right: 0 }}
            >
              reset
            </Button>
          )}
        </div>
        <WeatherContent location={location} setLocation={setLocation} />
      </Card>
    </Box>
  );
};

type LocationStateProps = {
  location: string | null;
  setLocation: React.Dispatch<React.SetStateAction<string | null>>;
};

const WeatherContent = ({ location, setLocation }: LocationStateProps) => {
  const { isLoading, isError, data, error } = useQuery(
    ['weather', location],
    () => getWeather(location ?? ''),
    {
      enabled: !!location,
    }
  );

  if (isLoading) {
    return <CircularProgress />;
  }

  if (isError) {
    return <span>Error: {error}</span>;
  }

  if (!location || !data) {
    return <LocationSearch location={location} setLocation={setLocation} />;
  }

  return <WeatherDetails weather={data} />;
};

const LocationSearch = ({ location, setLocation }: LocationStateProps) => {
  const [locationInputValue, setLocationInputValue] = useState('');

  return (
    <Autocomplete
      value={location}
      inputValue={locationInputValue}
      onChange={(_, newValue) => {
        setLocation(newValue);
      }}
      onInputChange={(_, newInputValue) => {
        setLocationInputValue(newInputValue);
      }}
      disablePortal
      id="combo-box-location"
      options={locationOptions}
      renderInput={(params) => <TextField {...params} label="Location" />}
    />
  );
};

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
