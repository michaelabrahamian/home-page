import { ApolloProvider } from '@apollo/client';
import { Provider as ReduxProvider } from 'react-redux';
import { apolloClient } from '../graphql/apolloClient';
import { store } from '../store';

type RenderWithProvidersProps = { children: React.ReactNode };

export const RenderWithProviders = ({ children }: RenderWithProvidersProps) => (
  <ReduxProvider store={store}>
    <ApolloProvider client={apolloClient}>{children}</ApolloProvider>
  </ReduxProvider>
);
