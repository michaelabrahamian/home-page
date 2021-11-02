import { ApolloProvider } from '@apollo/client';
import { apolloClient } from '../graphql/apolloClient';

type RenderWithProvidersProps = { children: React.ReactNode };

export const RenderWithProviders = ({ children }: RenderWithProvidersProps) => (
  <ApolloProvider client={apolloClient}>{children}</ApolloProvider>
);
