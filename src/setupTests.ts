// jest-dom adds custom jest matchers for asserting on DOM nodes.
// allows you to do things like:
// expect(element).toHaveTextContent(/react/i)
// learn more: https://github.com/testing-library/jest-dom
import '@testing-library/jest-dom';
import { apolloClient } from './graphql/apolloClient';
import { server } from './test-utils/msw/server';

// Establish API mocking before all tests.
beforeAll(() =>
  server.listen({
    onUnhandledRequest: 'warn',
  })
);

beforeEach(() => {
  apolloClient.clearStore();
});

// Reset any request handlers that we may add during the tests,
// so they don't affect other tests.
afterEach(() => server.resetHandlers());

// Clean up after the tests are finished.
afterAll(() => server.close());
