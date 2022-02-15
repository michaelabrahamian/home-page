import styled from '@emotion/styled';
import {
  Grid,
  ListItem,
  ListItemButton,
  ListItemText,
  Typography,
} from '@mui/material';
import { NewsItem } from '../../types/news';
import { getFormattedElapsedTime } from '../../utils/dates';

type NewsArticleProps = {
  newsItem: NewsItem;
};

export const NewsArticle = ({ newsItem }: NewsArticleProps) => {
  const { id, title, publicationDate, category, url } = newsItem;

  const formattedDate = getFormattedElapsedTime(publicationDate);

  return (
    <ListItem data-testid={id}>
      <ListItemButton
        href={url}
        target="_blank"
        component="a"
        sx={{ flexDirection: 'column', alignItems: 'flex-start' }}
      >
        <ListItemText primary={title} />
        <Grid container justifyContent="space-between">
          <Grid item>
            <SubText>{category}</SubText>
          </Grid>
          <Grid item>
            <SubText>{formattedDate}</SubText>
          </Grid>
        </Grid>
      </ListItemButton>
    </ListItem>
  );
};

const SubText = styled(Typography)`
  font-size: 0.75rem;
  color: rgba(0, 0, 0, 0.6);
`;
