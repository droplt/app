import { useQuery } from '@apollo/client';

import { USER_QUERY } from './graphql';

export const useUserQuery = (uid: string = '') => {
  const { loading, data, error } = useQuery(USER_QUERY, {
    variables: {
      uid,
    },
  });

  return {
    data,
    loading,
    error,
  };
};
