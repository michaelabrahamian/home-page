import { Container } from '@mui/material';

import './App.css';
import { PageHeader } from './components/Header/Header';
import { RenderWithProviders } from './components/RenderWithProviders';
import { Widgets } from './components/Widgets';

const App = () => {
  return (
    <RenderWithProviders>
      <div className="App">
        <Container sx={{ minHeight: 'inherit' }}>
          <PageHeader />
          <Widgets />
        </Container>
      </div>
    </RenderWithProviders>
  );
};

export default App;
