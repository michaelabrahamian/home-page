import { formatDate } from './dates';

describe('dates util', () => {
  describe('formatDate', () => {
    it('displays a date in the correct format', () => {
      const dateString = '2021-10-27T16:03:06Z';
      const formattedDate = formatDate(dateString);

      expect(formattedDate).toBe('28/10/2021, 3:03:06 am');
    });
  });
});
