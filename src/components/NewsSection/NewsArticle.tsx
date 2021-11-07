import { Grid, ListItem, ListItemButton, ListItemText } from '@mui/material';
import { NewsItem } from '../../types/news';
import { formatDate } from '../../utils/dates';

type NewsArticleProps = {
  newsItem: NewsItem;
};

export const NewsArticle = ({ newsItem }: NewsArticleProps) => {
  const { id, title, publicationDate, category, url } = newsItem;

  const formattedDate = formatDate(publicationDate);

  return (
    <ListItem data-testid={id}>
      <ListItemButton href={url} target="_blank" component="a">
        <ListItemText
          primary={title}
          secondary={
            <Grid container justifyContent="space-between">
              <Grid item>{formattedDate}</Grid>
              <Grid item>{category}</Grid>
            </Grid>
          }
        />
      </ListItemButton>
    </ListItem>
  );
};
