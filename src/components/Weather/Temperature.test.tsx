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

  it('displays nothing if temperature is not provided', () => {
    render(<Temperature />);

    expect(screen.queryByText('°C')).not.toBeInTheDocument();
  });
});
