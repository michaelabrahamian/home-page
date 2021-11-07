import { Grid } from '@mui/material';
import { WeatherWidget } from './WeatherSection/Weather';
import { NewsWidget } from './NewsSection/News';

export const Widgets = () => (
  <Grid container sx={{ marginTop: 5 }} spacing={2} direction="row">
    <WeatherWidget />
    <NewsWidget />
  </Grid>
);
