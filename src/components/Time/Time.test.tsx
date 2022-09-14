import { render, screen } from '@testing-library/react';
import { act } from 'react-dom/test-utils';
import { Time } from './Time';

beforeEach(() => {
  jest.useFakeTimers('modern');
  jest.setSystemTime(new Date('2022-02-02T15:00:00'));
});

afterEach(() => {
  jest.useRealTimers();
});

describe('Time', () => {
  test('displays the current time', () => {
    render(<Time />);

    expect(
      screen.getByText('Wednesday, 2 February 2022 at 3:00 pm')
    ).toBeInTheDocument();
  });

  test('updates the current time', () => {
    render(<Time />);

    expect(
      screen.getByText('Wednesday, 2 February 2022 at 3:00 pm')
    ).toBeInTheDocument();

    act(() => {
      jest.advanceTimersByTime(60_000);
    });

    expect(
      screen.getByText('Wednesday, 2 February 2022 at 3:01 pm')
    ).toBeInTheDocument();
  });
});
