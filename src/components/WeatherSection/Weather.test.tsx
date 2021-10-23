import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import { Weather, WeatherDetails } from './Weather';
import { RenderWithProviders } from '../RenderWithProviders';
import { WeatherFormatted } from '../../api/weather/types';

const renderWeather = () =>
  render(
    <RenderWithProviders>
      <Weather />
    </RenderWithProviders>
  );

describe('Weather', () => {
  describe('WeatherDetails', () => {
    it('displays the correct weather details', async () => {
      const weather: WeatherFormatted = {
        location: 'Sydney',
        icon: 'ICON',
        longDescription: 'clear sky',
        shortDescription: 'Clear',
        temperature: {
          average: 34.2,
          min: 20,
          max: 35,
          feelsLike: 36,
        },
        windSpeed: 6.5,
        humidity: 42,
      };

      render(<WeatherDetails weather={weather} />);

      const temperature = screen.getByText('34°C');
      const wind = screen.getByText('Wind: 23 km/h');
      const humidity = screen.getByText('Humidity: 42%');
      const description = screen.getByText('clear sky');
      const image = screen.getByAltText('Clear');

      expect(temperature).toBeInTheDocument();
      expect(wind).toBeInTheDocument();
      expect(humidity).toBeInTheDocument();
      expect(description).toBeInTheDocument();
      expect(image).toBeInTheDocument();
    });
  });

  describe('Weather component', () => {
    it('displays a loading spinner after selecting a location', async () => {
      renderWeather();

      const locationSearch = screen.getByRole('textbox', { name: 'Location' });
      fireEvent.change(locationSearch, { target: { value: 'Sydney' } });

      const sydneyOption = screen.getByRole('option', { name: 'Sydney' });
      fireEvent.click(sydneyOption);

      const loadingSpinner = screen.getByRole('progressbar');

      expect(loadingSpinner).toBeInTheDocument();
    });

    it('fetches and displays location data after selecting a location', async () => {
      renderWeather();

      const locationSearch = screen.getByRole('textbox', { name: 'Location' });
      fireEvent.change(locationSearch, { target: { value: 'Sydney' } });

      const sydneyOption = screen.getByRole('option', { name: 'Sydney' });
      fireEvent.click(sydneyOption);

      // wait for loading spinner to disappear
      await waitFor(() =>
        expect(screen.queryByRole('progressBar')).not.toBeInTheDocument()
      );

      const temperature = await screen.findByText('28°C');
      const wind = screen.getByText('Wind: 19 km/h');
      const humidity = screen.getByText('Humidity: 60%');
      const description = screen.getByText('clear sky');
      const image = screen.getByAltText('Clear');

      expect(temperature).toBeInTheDocument();
      expect(wind).toBeInTheDocument();
      expect(humidity).toBeInTheDocument();
      expect(description).toBeInTheDocument();
      expect(image).toBeInTheDocument();
    });

    it('displays a reset button only after location is selected', async () => {
      renderWeather();

      expect(screen.queryByText(/reset/i)).not.toBeInTheDocument();

      const locationSearch = screen.getByRole('textbox', { name: 'Location' });
      fireEvent.change(locationSearch, { target: { value: 'Sydney' } });

      const sydneyOption = screen.getByRole('option', { name: 'Sydney' });
      fireEvent.click(sydneyOption);

      // wait for loading spinner to disappear
      await waitFor(() =>
        expect(screen.queryByRole('progressBar')).not.toBeInTheDocument()
      );

      expect(screen.getByText(/reset/i)).toBeInTheDocument();
    });

    it('should clear weather location after clicking reset', async () => {
      renderWeather();

      const locationSearch = screen.getByRole('textbox', { name: 'Location' });
      fireEvent.change(locationSearch, { target: { value: 'Sydney' } });

      const sydneyOption = screen.getByRole('option', { name: 'Sydney' });
      fireEvent.click(sydneyOption);

      // wait for loading spinner to disappear
      await waitFor(() =>
        expect(screen.queryByRole('progressBar')).not.toBeInTheDocument()
      );

      expect(screen.getByText('Wind:', { exact: false })).toBeInTheDocument();

      const resetButton = screen.getByText(/reset/i);
      fireEvent.click(resetButton);

      expect(screen.queryByText('Wind:')).not.toBeInTheDocument();
    });
  });
});
