import { Card, CircularProgress, Grid } from '@mui/material';
import { Box } from '@mui/system';
import { useQuery } from 'react-query';
import { getImageURL, getWeather } from '../../api/weather/weather';
import { SectionHeading } from '../SectionHeading';
import { Typography } from '@mui/material';
import { Temperature } from './Temperature';
import { Wind } from './Wind';
import { Humidity } from './Humidity';

export const Weather = () => {
  const boxStyles = {
    maxWidth: 600,
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

  if (!data) {
    return null;
  }

  return (
    <Grid container justifyContent="space-between">
      <Grid item px={10} sx={{ textAlign: 'left' }}>
        <Typography variant="h3" sx={{ fontSize: 32 }}>
          {data?.location}
        </Typography>
        <Temperature temperature={data.temperature.average} />
        <Wind windSpeedMetresPerSecond={data.windSpeed} />
        <Humidity humidity={data.humidity} />
      </Grid>

      <Grid item px={10} sx={{ textAlign: 'center' }}>
        <img
          src={getImageURL(data.icon)}
          alt={data.shortDescription}
          width="80px"
        />
        <p style={{ margin: 0 }}>{data.longDescription}</p>
      </Grid>
    </Grid>
  );
};
