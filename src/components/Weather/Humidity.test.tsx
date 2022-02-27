import { render, screen } from '@testing-library/react';
import { Humidity } from './Humidity';

describe('Humidity', () => {
  it('displays the humidity with percentage', () => {
    render(<Humidity humidity={52} />);

    expect(screen.getByText('Humidity: 52%')).toBeInTheDocument();
  });

  it('rounds the humidity to a integer', () => {
    render(<Humidity humidity={52.52} />);

    expect(screen.getByText('Humidity: 53%')).toBeInTheDocument();
  });

  it('displays nothing if humidity is not provided', () => {
    render(<Humidity />);

    expect(screen.queryByText('Humidity')).not.toBeInTheDocument();
  });
});
