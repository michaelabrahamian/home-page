import {
  differenceInDays,
  differenceInHours,
  differenceInWeeks,
  differenceInMinutes,
} from 'date-fns';

export const getFormattedElapsedTime = (dateString: string): string => {
  const dateFrom = new Date(dateString);
  const dateNow = new Date();

  const hoursSince = differenceInHours(dateNow, dateFrom);

  // return an empty string if a future date
  if (hoursSince < 0) {
    return '';
  }

  // within the current hour
  if (hoursSince === 0) {
    const minutesSince = differenceInMinutes(dateNow, dateFrom);
    const pluralisedMinutes = minutesSince === 1 ? 'minute' : 'minutes';

    if (minutesSince === 0) {
      return 'Just now';
    }

    return `${minutesSince} ${pluralisedMinutes} ago`;
  }

  const daysSince = differenceInDays(dateNow, dateFrom);

  // within the current day
  if (daysSince === 0) {
    const pluralisedHours = hoursSince === 1 ? 'hour' : 'hours';
    return `${hoursSince} ${pluralisedHours} ago`;
  }

  // within the current week
  if (daysSince < 7) {
    const pluralisedDays = daysSince === 1 ? 'day' : 'days';
    return `${daysSince} ${pluralisedDays} ago`;
  }

  // before a week ago
  if (daysSince >= 7) {
    const weeksSince = differenceInWeeks(dateNow, dateFrom);
    const pluralisedWeeks = weeksSince === 1 ? 'week' : 'weeks';
    return `${differenceInWeeks(dateNow, dateFrom)} ${pluralisedWeeks} ago`;
  }

  return '';
};
