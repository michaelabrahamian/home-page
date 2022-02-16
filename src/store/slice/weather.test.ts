import { weatherReducer, setLocation } from './weather';

describe('Weather slice', () => {
  it('should return the initial state', () => {
    const initialState = undefined;
    const action = { type: '' };
    expect(weatherReducer(initialState, action)).toEqual({
      location: '',
    });
  });

  it('should handle a location update', () => {
    const initialState = { location: '' };
    'test'.startsWith('test');

    expect(weatherReducer(initialState, setLocation('London'))).toEqual({
      location: 'London',
    });
  });
});
