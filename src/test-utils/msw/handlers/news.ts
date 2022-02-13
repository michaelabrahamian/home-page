import { graphql } from 'msw';
import { DEFAULT_NEWS_RESPONSE } from '../../mocks/news';

export const mockGetNews = graphql.query('GetNews', (_, res, ctx) =>
  res(ctx.data(DEFAULT_NEWS_RESPONSE))
);
