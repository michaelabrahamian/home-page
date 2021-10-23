import { render, screen } from '@testing-library/react';
import { Temperature } from './Temperature';

describe('Temperature', () => {
  it('displays the temperature with unit', () => {
    render(<Temperature temperature={23} />);

    expect(screen.getByText('23°C')).toBeInTheDocument();
  });

  it('rounds the temperature to an integer', () => {
    render(<Temperature temperature={23.34} />);

    expect(screen.getByText('23°C')).toBeInTheDocument();
  });

  it('displays a default temperature if the temperature is undefined', () => {
    render(<Temperature />);

    expect(screen.getByText('0°C')).toBeInTheDocument();
  });
});
