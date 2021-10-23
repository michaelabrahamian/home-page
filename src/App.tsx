import { Container, Grid } from '@mui/material';
import './App.css';
import { PageHeader } from './components/Header';
import { Weather } from './components/WeatherSection/Weather';
import { RenderWithProviders } from './components/RenderWithProviders';

const App = () => {
  return (
    <RenderWithProviders>
      <div className="App">
        <Container>
          <PageHeader />
          <Grid sx={{ marginTop: 5 }}>
            <Weather />
          </Grid>
        </Container>
      </div>
    </RenderWithProviders>
  );
};

export default App;
