import { ApolloClient, InMemoryCache } from '@apollo/client';
export { ApolloProvider } from '@apollo/client/react';

const client = new ApolloClient({
  uri: '/graphql',
  cache: new InMemoryCache(),
});

export default client;
