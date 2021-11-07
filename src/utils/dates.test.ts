import { getFormattedElapsedTime } from './dates';

const ONE_MINUTE_IN_MS = 60 * 1000;
const ONE_HOUR_IN_MS = 60 * ONE_MINUTE_IN_MS;
const ONE_DAY_IN_MS = 24 * ONE_HOUR_IN_MS;
const ONE_WEEK_IN_MS = 7 * ONE_DAY_IN_MS;

describe('dates util', () => {
  describe('getFormattedElapsedTime', () => {
    it('outputs an appropriate message if the date is within the same minute as now', () => {
      const now = new Date();
      const thirtySecondsAgo = new Date(now.getTime() - 30 * 1000);

      const formattedDate = getFormattedElapsedTime(
        thirtySecondsAgo.toISOString()
      );

      expect(formattedDate).toBe('Just now');
    });

    it('outputs the number of minutes that passed as a plural', () => {
      const now = new Date();
      const twentyThreeMinutesAgo = new Date(
        now.getTime() - 23 * ONE_MINUTE_IN_MS
      );

      const formattedDate = getFormattedElapsedTime(
        twentyThreeMinutesAgo.toISOString()
      );

      expect(formattedDate).toBe('23 minutes ago');
    });

    it('outputs the number of minutes that passed as a singular', () => {
      const now = new Date();
      const oneMinuteAgo = new Date(now.getTime() - 1 * ONE_MINUTE_IN_MS);

      const formattedDate = getFormattedElapsedTime(oneMinuteAgo.toISOString());

      expect(formattedDate).toBe('1 minute ago');
    });

    it('outputs the number of hours that passed as a plural', () => {
      const now = new Date();
      const sixHoursAgo = new Date(now.getTime() - 6 * ONE_HOUR_IN_MS);

      const formattedDate = getFormattedElapsedTime(sixHoursAgo.toISOString());

      expect(formattedDate).toBe('6 hours ago');
    });

    it('outputs the number of hours that passed as a singular', () => {
      const now = new Date();
      const oneHourAgo = new Date(now.getTime() - 1 * ONE_HOUR_IN_MS);

      const formattedDate = getFormattedElapsedTime(oneHourAgo.toISOString());

      expect(formattedDate).toBe('1 hour ago');
    });

    it('outputs the number of days that passed as a plural', () => {
      const now = new Date();
      const threeDaysAgo = new Date(now.getTime() - 3 * ONE_DAY_IN_MS);

      const formattedDate = getFormattedElapsedTime(threeDaysAgo.toISOString());

      expect(formattedDate).toBe('3 days ago');
    });

    it('outputs the number of days that passed as a singular', () => {
      const now = new Date();
      const oneDayAgo = new Date(now.getTime() - 1 * ONE_DAY_IN_MS);

      const formattedDate = getFormattedElapsedTime(oneDayAgo.toISOString());

      expect(formattedDate).toBe('1 day ago');
    });

    it('outputs the number of weeks that passed as a plural', () => {
      const now = new Date();
      const fiveWeeksAgo = new Date(now.getTime() - 5 * ONE_WEEK_IN_MS);

      const formattedDate = getFormattedElapsedTime(fiveWeeksAgo.toISOString());

      expect(formattedDate).toBe('5 weeks ago');
    });

    it('outputs the number of weeks that passed as a singular', () => {
      const now = new Date();
      const oneWeekAgo = new Date(now.getTime() - 1 * ONE_WEEK_IN_MS);

      const formattedDate = getFormattedElapsedTime(oneWeekAgo.toISOString());

      expect(formattedDate).toBe('1 week ago');
    });

    it('outputs an empty string for future dates', () => {
      const now = new Date();
      const oneHourInTheFuture = new Date(now.getTime() + 1 * ONE_HOUR_IN_MS);

      const formattedDate = getFormattedElapsedTime(
        oneHourInTheFuture.toISOString()
      );

      expect(formattedDate).toBe('');
    });
  });
});
