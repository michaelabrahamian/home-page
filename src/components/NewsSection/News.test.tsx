import { render, screen, waitFor } from '@testing-library/react';
import { server, graphql } from '../../test-utils/msw';
import { NewsResponse } from '../../types/news';
import { RenderWithProviders } from '../RenderWithProviders';
import { NewsWidget } from './News';

const renderNewsWidget = () =>
  render(
    <RenderWithProviders>
      <NewsWidget />
    </RenderWithProviders>
  );

describe('News', () => {
  it('displays heading', () => {
    renderNewsWidget();

    expect(screen.getByText('News')).toBeInTheDocument();
  });

  it('displays loading initially', async () => {
    renderNewsWidget();

    const loadingSpinner = await screen.findByRole('progressbar');
    expect(loadingSpinner).toBeInTheDocument();

    // wait for the loading spinner to disappear to properly teardown test
    await waitFor(() => expect(loadingSpinner).not.toBeInTheDocument());
  });

  it('displays error message if there is a network error', async () => {
    server.use(
      graphql.query('GetNews', (_, res, ctx) =>
        res(
          ctx.errors([
            {
              message: 'Error',
            },
          ])
        )
      )
    );

    renderNewsWidget();

    const errorMessage = await screen.findByText(/unable to get news/i);
    expect(errorMessage).toBeInTheDocument();
  });

  it('displays a warning if no news articles were found', async () => {
    server.use(
      graphql.query('GetNews', (_, res, ctx) =>
        res(
          ctx.data({
            news: {
              results: [],
            },
          })
        )
      )
    );

    renderNewsWidget();
    const warningMessage = await screen.findByText(/no results found./i);
    expect(warningMessage).toBeInTheDocument();
  });

  it('displays a single news article', async () => {
    renderNewsWidget();

    // wait for loading to finish
    const loadingSpinner = await screen.findByRole('progressbar');
    await waitFor(() => expect(loadingSpinner).not.toBeInTheDocument());

    const title = screen.getByText(
      /Second Sydney bus destroyed by fire after driver and passengers flee flames/i
    );
    const category = screen.getByText(/Australia news/i);

    expect(title).toBeInTheDocument();
    expect(category).toBeInTheDocument();
  });

  it('displays several news articles', async () => {
    const newsResponse: NewsResponse = {
      news: {
        results: [
          {
            category: 'Category 1',
            id: 'ID-1',
            publicationDate: new Date().toString(),
            title: 'TITLE 1',
            url: 'URL-1',
          },
          {
            category: 'Category 2',
            id: 'ID-2',
            publicationDate: new Date().toString(),
            title: 'TITLE 2',
            url: 'URL-2',
          },
        ],
      },
    };

    server.use(
      graphql.query('GetNews', (_, res, ctx) => res(ctx.data(newsResponse)))
    );

    renderNewsWidget();

    // wait for loading to finish
    const loadingSpinner = await screen.findByRole('progressbar');
    await waitFor(() => expect(loadingSpinner).not.toBeInTheDocument());

    expect(screen.getByText(/TITLE 1/i)).toBeInTheDocument();
    expect(screen.getByText(/TITLE 1/i)).toBeInTheDocument();

    expect(screen.getByText(/Category 1/i)).toBeInTheDocument();
    expect(screen.getByText(/Category 2/i)).toBeInTheDocument();
  });
});
