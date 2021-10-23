import { render, screen } from '@testing-library/react';
import { Weather } from './Weather';
import { RenderWithProviders } from '../RenderWithProviders';

describe('Weather', () => {
  it('displays the correct weather details', async () => {
    render(
      <RenderWithProviders>
        <Weather />
      </RenderWithProviders>
    );

    const location = await screen.findByText('Sydney');
    const temperature = screen.getByText('28°C');
    const wind = screen.getByText('Wind: 19 km/h');
    const humidity = screen.getByText('Humidity: 60%');
    const description = screen.getByText('clear sky');
    const image = screen.getByAltText('Clear');

    expect(location).toBeInTheDocument();
    expect(temperature).toBeInTheDocument();
    expect(wind).toBeInTheDocument();
    expect(humidity).toBeInTheDocument();
    expect(description).toBeInTheDocument();
    expect(image).toBeInTheDocument();
  });
});
