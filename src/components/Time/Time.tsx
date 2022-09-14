import { useEffect, useState } from 'react';

const LOCALE = 'en-AU';

const formatDate = (date: Date): string =>
  new Intl.DateTimeFormat(LOCALE, {
    dateStyle: 'full',
    timeStyle: 'short',
  }).format(date);

const UPDATE_FORMATTED_DATE_INTERVAL = 1_000;

export const Time = (): JSX.Element => {
  const [formattedDate, setFormattedDate] = useState(formatDate(new Date()));

  useEffect(() => {
    const updateFormattedDateInterval = setInterval(() => {
      setFormattedDate(formatDate(new Date()));
    }, UPDATE_FORMATTED_DATE_INTERVAL);

    return () => {
      clearInterval(updateFormattedDateInterval);
    };
  });

  return <>{formattedDate}</>;
};
