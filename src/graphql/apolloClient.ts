import { ApolloClient, HttpLink, InMemoryCache } from '@apollo/client';

const cache = new InMemoryCache();

const link = new HttpLink({
  uri: process.env.REACT_APP_BACKEND_URI,

  // Use explicit `window.fetch` so that outgoing requests
  // are captured and deferred until the Service Worker is ready.
  // ref: https://github.com/mswjs/examples/blob/master/examples/graphql-react-apollo/src/ApolloClient.js
  fetch: (...args) => fetch(...args),
});

// Isolate Apollo client so it could be reused in both application runtime and tests.
export const apolloClient = new ApolloClient({
  cache,
  link,
});
