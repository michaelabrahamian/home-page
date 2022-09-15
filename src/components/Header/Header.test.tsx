import { render, screen } from '@testing-library/react';
import { PageHeader } from './Header';

describe('PageHeader', () => {
  test('displays the correct static header', () => {
    render(<PageHeader />);

    expect(screen.getByText('Home page')).toBeInTheDocument();
  });

  test('displays the current time', () => {
    jest.useFakeTimers('modern');
    jest.setSystemTime(new Date('2022-02-02T15:00:00'));

    render(<PageHeader />);

    const currentTime = screen.getByText(
      'Wednesday, 2 February 2022 at 3:00 pm'
    );

    expect(currentTime).toBeInTheDocument();

    jest.useRealTimers();
  });
});
