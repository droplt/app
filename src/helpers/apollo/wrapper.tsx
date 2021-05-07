import { ApolloProvider } from '@apollo/client/react';
import React from 'react';

import client from './client';

const ApolloWrapper: React.FC = ({ children }) => {
  return <ApolloProvider client={client}>{children}</ApolloProvider>;
};

export default ApolloWrapper;
