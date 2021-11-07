const LOCALE = 'en-AU';

export const formatDate = (dateString: string) => {
  const date = new Date(dateString);
  return date.toLocaleString(LOCALE);
};
