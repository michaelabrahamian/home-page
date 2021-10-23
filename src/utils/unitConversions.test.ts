import { convertMetresPerSecondToKilometresPerHour } from './unitConversions';

describe('unitConversions', () => {
  describe('convertMetresPerSecondToKilometresPerHour', () => {
    it('converts a positive integer correctly', () => {
      const kmph = convertMetresPerSecondToKilometresPerHour(2);

      expect(kmph).toEqual(7.2);
    });

    it('converts a negative integer correctly', () => {
      const kmph = convertMetresPerSecondToKilometresPerHour(-2);

      expect(kmph).toEqual(-7.2);
    });

    it('converts a positive floating number', () => {
      const kmph = convertMetresPerSecondToKilometresPerHour(5.1);

      expect(kmph).toEqual(18.36);
    });

    it('converts a negative floating number', () => {
      const kmph = convertMetresPerSecondToKilometresPerHour(-5.1);

      expect(kmph).toEqual(-18.36);
    });
  });
});
