import { useQuery } from '@apollo/client';
import { CircularProgress, List } from '@mui/material';
import ErrorOutlineIcon from '@mui/icons-material/ErrorOutline';
import WarningIcon from '@mui/icons-material/Warning';

import { GET_NEWS, GET_NEWS_VARIABLES } from '../../graphql/queries';
import { NewsResponse } from '../../types/news';
import { selectLocation } from '../../store/slice/weather';
import { useAppSelector } from '../../store/hooks';
import { SectionHeading } from '../SectionHeading';
import { WidgetContainer } from '../WidgetContainer';
import { NewsArticle } from './NewsArticle';

export const NewsWidget = (): JSX.Element => (
  <WidgetContainer>
    <SectionHeading testId="news-section-heading" heading="News" />
    <NewsContent />
  </WidgetContainer>
);

const FALLBACK_QUERY = '';

const NewsContent = (): JSX.Element => {
  const location = useAppSelector(selectLocation);

  const { loading, error, data } = useQuery<NewsResponse, GET_NEWS_VARIABLES>(
    GET_NEWS,
    {
      variables: {
        query: location ?? FALLBACK_QUERY,
      },
    }
  );

  if (loading) {
    return <CircularProgress />;
  }

  if (error) {
    return (
      <span>
        <ErrorOutlineIcon /> Unable to get news
      </span>
    );
  }

  if (!data?.news?.results?.length) {
    return (
      <span>
        <WarningIcon /> No results found.
      </span>
    );
  }

  return (
    <List
      dense
      sx={{
        maxHeight: 500,
        overflow: 'auto',
      }}
    >
      {data.news.results.map((newsItem) => (
        <NewsArticle newsItem={newsItem} key={newsItem.id} />
      ))}
    </List>
  );
};
