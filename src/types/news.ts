export type NewsResponse = {
  news: {
    results: Array<NewsItem>;
  };
};

export type NewsItem = {
  id: string;
  title: string;
  url: string;
  publicationDate: string;
  category: string;
};
