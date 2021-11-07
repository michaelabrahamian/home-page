import { useQuery } from '@apollo/client';
import { CircularProgress } from '@mui/material';
import ErrorOutlineIcon from '@mui/icons-material/ErrorOutline';
import WarningIcon from '@mui/icons-material/Warning';

import { SectionHeading } from '../SectionHeading';
import { WidgetContainer } from '../WidgetContainer';
import { GET_NEWS, GET_NEWS_VARIABLES } from '../../graphql/queries';
import { NewsResponse } from '../../types/news';
import { NewsArticle } from './NewsArticle';

export const NewsWidget = () => (
  <WidgetContainer>
    <SectionHeading testId="news-section-heading" heading="News" />
    <NewsContent />
  </WidgetContainer>
);

const NewsContent = () => {
  const { loading, error, data } = useQuery<NewsResponse, GET_NEWS_VARIABLES>(
    GET_NEWS,
    {
      variables: {
        query: 'Sydney',
      },
    }
  );

  if (loading) {
    return <CircularProgress />;
  }

  if (error) {
    return (
      <span>
        <ErrorOutlineIcon /> Unable to get weather details
      </span>
    );
  }

  if (!data || !data.news || !data.news.results?.length) {
    return (
      <span>
        <WarningIcon /> No results found.
      </span>
    );
  }

  return (
    <>
      {data.news.results.map((newsItem) => (
        <NewsArticle newsItem={newsItem} />
      ))}
    </>
  );
};
