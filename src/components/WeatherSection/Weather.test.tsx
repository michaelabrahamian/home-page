import userEvent from '@testing-library/user-event';
import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import {
  WeatherWidget,
  WeatherDetails,
  DEBOUNCE_SET_LOCATION_DELAY_MS,
} from './Weather';
import { RenderWithProviders } from '../RenderWithProviders';
import { WeatherData } from '../../types/weather';

const renderWeather = () =>
  render(
    <RenderWithProviders>
      <WeatherWidget />
    </RenderWithProviders>
  );

beforeEach(() => {
  jest.useFakeTimers();
  localStorage.clear();
});

afterEach(() => {
  jest.useRealTimers();
});

describe('Weather', () => {
  describe('WeatherDetails', () => {
    it('displays the correct weather details', async () => {
      const weather: WeatherData = {
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

  describe('WeatherWidget component', () => {
    it('displays a loading spinner after typing a location', async () => {
      renderWeather();

      const locationSearch = screen.getByRole('textbox', { name: 'Location' });
      userEvent.type(locationSearch, 'Sydney');

      // skip timers ahead by debounce delay
      jest.advanceTimersByTime(DEBOUNCE_SET_LOCATION_DELAY_MS);

      const loadingSpinner = await screen.findByRole('progressbar');

      expect(loadingSpinner).toBeInTheDocument();
    });

    it('fetches and displays location data after entering a valid location', async () => {
      renderWeather();

      const locationSearch = screen.getByRole('textbox', { name: 'Location' });
      userEvent.type(locationSearch, 'Sydney');

      // skip timers ahead by debounce delay
      jest.advanceTimersByTime(DEBOUNCE_SET_LOCATION_DELAY_MS);

      // wait for search bar to disappear
      await waitFor(() => expect(locationSearch).not.toBeInTheDocument());

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

    it('displays the change location button only after location is selected', async () => {
      renderWeather();

      expect(screen.queryByText(/change/i)).not.toBeInTheDocument();

      const locationSearch = screen.getByRole('textbox', { name: 'Location' });
      userEvent.type(locationSearch, 'Sydney');

      // skip timers ahead by debounce delay
      jest.advanceTimersByTime(DEBOUNCE_SET_LOCATION_DELAY_MS);

      // wait for search bar to disappear
      await waitFor(() => expect(locationSearch).not.toBeInTheDocument());

      expect(screen.getByText(/change/i)).toBeInTheDocument();
    });

    it('should show the location search bar after clicking the change button', async () => {
      renderWeather();

      let locationSearch: HTMLElement | null = screen.getByRole('textbox', {
        name: 'Location',
      });

      userEvent.type(locationSearch, 'Sydney');

      // skip timers ahead by debounce delay
      jest.advanceTimersByTime(DEBOUNCE_SET_LOCATION_DELAY_MS);

      // wait for search bar to disappear
      locationSearch = screen.queryByRole('textbox', { name: 'Location' });
      await waitFor(() => expect(locationSearch).not.toBeInTheDocument());

      // details should appear
      expect(screen.getByText('Wind:', { exact: false })).toBeInTheDocument();

      const changeLocationButton = screen.getByText(/change/i);
      fireEvent.click(changeLocationButton);

      // search bar should appear
      locationSearch = screen.getByRole('textbox', { name: 'Location' });
      expect(locationSearch).toBeInTheDocument();
    });

    it('persists weather location after reloading app', async () => {
      const { unmount } = renderWeather();

      const locationSearch = screen.getByRole('textbox', { name: 'Location' });
      userEvent.type(locationSearch, 'Sydney');

      // skip timers ahead by debounce delay
      jest.advanceTimersByTime(DEBOUNCE_SET_LOCATION_DELAY_MS);

      // wait for search bar to disappear
      await waitFor(() => expect(locationSearch).not.toBeInTheDocument());

      // details should appear
      expect(screen.getByText('Wind:', { exact: false })).toBeInTheDocument();

      // unmount then remount
      unmount();
      renderWeather();

      // wait for persisted location and details to appear
      expect(await screen.findByText('Sydney')).toBeInTheDocument();
      expect(screen.getByText('Wind:', { exact: false })).toBeInTheDocument();
    });
  });
});
