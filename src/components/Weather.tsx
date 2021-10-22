import { Card, CircularProgress } from '@mui/material';
import { Box } from '@mui/system';
import { useQuery } from 'react-query';
import { getWeather } from '../api/weather/weather';
import { SectionHeading } from './SectionHeading';

export const Weather = () => {
  const boxStyles = {
    maxWidth: 800,
    margin: 'auto',
  };

  return (
    <Box sx={boxStyles}>
      <Card variant="outlined">
        <SectionHeading heading="Weather" />
        <WeatherContent />
      </Card>
    </Box>
  );
};

const WeatherContent = () => {
  const { isLoading, isError, data, error } = useQuery('weather', () =>
    getWeather('sydney')
  );

  if (isLoading) {
    return <CircularProgress />;
  }

  if (isError) {
    return <span>Error: {error}</span>;
  }

  return (
    <div>
      <p>{data?.location}</p>
      <p>{data?.longDescription}</p>
    </div>
  );
};
