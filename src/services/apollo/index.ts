import { ApolloClient, createHttpLink, InMemoryCache } from '@apollo/client';
export { ApolloProvider } from '@apollo/client/react';

const httpLink = createHttpLink({
  uri: '/graphql',
  credentials: 'same-origin',
});

const client = new ApolloClient({
  cache: new InMemoryCache(),
  link: httpLink,
});

export default client;
