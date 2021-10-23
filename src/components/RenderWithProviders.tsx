import { QueryClient, QueryClientProvider } from 'react-query';

const queryClient = new QueryClient();

type RenderWithProvidersProps = { children: React.ReactNode };

export const RenderWithProviders = ({ children }: RenderWithProvidersProps) => (
  <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
);
