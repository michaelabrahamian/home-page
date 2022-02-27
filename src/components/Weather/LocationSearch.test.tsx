import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { LocationSearch } from './LocationSearch';

describe('LocationSearch', () => {
  it('renders with a search value correctly', () => {
    const city = 'London';
    render(<LocationSearch searchValue={city} setSearchValue={jest.fn()} />);

    const inputField = screen.getByRole('textbox');
    expect(inputField).toHaveValue(city);
  });

  it('sets the search value correctly', () => {
    const setSearchValue = jest.fn();
    render(<LocationSearch searchValue="" setSearchValue={setSearchValue} />);

    const inputField = screen.getByRole('textbox');

    let searchValue = 'S';
    userEvent.type(inputField, searchValue);

    expect(setSearchValue).toHaveBeenCalledWith(searchValue);
    expect(setSearchValue).toHaveBeenCalledTimes(1);

    // clear mock call count
    setSearchValue.mockReset();

    searchValue = 'Sydney';
    userEvent.type(inputField, searchValue);
    expect(setSearchValue).toHaveBeenCalledTimes(searchValue.length);
  });

  it('is focused when loaded', () => {
    render(<LocationSearch searchValue="" setSearchValue={jest.fn()} />);
    const inputField = screen.getByRole('textbox');
    expect(inputField).toHaveFocus();
  });
});
