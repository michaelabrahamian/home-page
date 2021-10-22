import { Container, Grid } from '@mui/material';
import { QueryClient, QueryClientProvider } from 'react-query';
import './App.css';
import { PageHeader } from './components/Header';
import { Weather } from './components/Weather';

const queryClient = new QueryClient();

const App = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <div className="App">
        <Container>
          <PageHeader />
          <Grid sx={{ marginTop: 5 }}>
            <Weather />
          </Grid>
        </Container>
      </div>
    </QueryClientProvider>
  );
};

export default App;
