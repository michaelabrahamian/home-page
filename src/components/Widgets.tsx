import { Grid } from '@mui/material';
import { WeatherWidget } from './Weather/Weather';
import { NewsWidget } from './News/News';

export const Widgets = () => (
  <Grid container sx={{ marginTop: 2 }} spacing={2} direction="row">
    <WeatherWidget />
    <NewsWidget />
  </Grid>
);
