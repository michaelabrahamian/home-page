import { render, screen } from '@testing-library/react';
import { Wind } from './Wind';

describe('Wind', () => {
  it('displays the wind speed with unit', () => {
    render(<Wind windSpeedMetresPerSecond={3.9} />);

    expect(screen.getByText('Wind: 14 km/h')).toBeInTheDocument();
  });

  it('displays nothing if wind speed not provided', () => {
    render(<Wind />);

    expect(screen.queryByText('Wind')).not.toBeInTheDocument();
  });
});
