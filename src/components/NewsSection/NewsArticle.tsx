import { Grid, Card, CardActionArea } from '@mui/material';
import { NewsItem } from '../../types/news';
import { formatDate } from '../../utils/dates';

type NewsArticleProps = {
  newsItem: NewsItem;
};

export const NewsArticle = ({ newsItem }: NewsArticleProps) => {
  const { id, title, publicationDate, category, url } = newsItem;

  const formattedDate = formatDate(publicationDate);

  return (
    <Grid item data-testid={id}>
      <Card>
        <CardActionArea href={url} target="_blank">
          <p>{title}</p>
          <p>{formattedDate}</p>
          <p>{category}</p>
        </CardActionArea>
      </Card>
    </Grid>
  );
};
