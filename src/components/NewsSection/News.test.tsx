import { render, screen, waitFor } from '@testing-library/react';
import { server, graphql } from '../../test-utils/msw';
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
});
