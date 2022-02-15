import { render, screen } from '@testing-library/react';
import { NewsArticle } from './NewsArticle';

describe('NewsArticle', () => {
  it('displays correctly', () => {
    const newsItem = {
      id: '1',
      title: 'News title',
      publicationDate: new Date().toString(),
      category: 'News category',
      url: 'https://www.news.com',
    };

    render(<NewsArticle newsItem={newsItem} />);

    expect(screen.getByText('News title')).toBeInTheDocument();
    expect(screen.getByText('News category')).toBeInTheDocument();
    expect(screen.getByText('Just now')).toBeInTheDocument();
  });

  it('contains a link to the article', () => {
    const url = 'https://www.news.com';

    const newsItem = {
      id: '1',
      title: 'News title',
      publicationDate: new Date().toString(),
      category: 'News category',
      url,
    };

    render(<NewsArticle newsItem={newsItem} />);

    expect(screen.getByRole('link')).toHaveAttribute('href', url);
  });
});
