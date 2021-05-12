import { useQuery } from '@apollo/client';

import { USER_QUERY } from './graphql';

export const useUserQuery = () => {
  const { loading, data, error } = useQuery(USER_QUERY, {
    variables: {
      id: 'test',
    },
  });

  return {
    data,
    loading,
    error,
  };
};
