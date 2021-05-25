/* eslint-disable */
import * as Types from './types';

import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
const defaultOptions = {};

export const AuthUserDocument = gql`
  query authUser {
    me {
      uid
      email
      username
    }
  }
`;

/**
 * __useAuthUserQuery__
 *
 * To run a query within a React component, call `useAuthUserQuery` and pass it any options that fit your needs.
 * When your component renders, `useAuthUserQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useAuthUserQuery({
 *   variables: {
 *   },
 * });
 */
export function useAuthUserQuery(
  baseOptions?: Apollo.QueryHookOptions<
    Types.AuthUserQuery,
    Types.AuthUserQueryVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useQuery<Types.AuthUserQuery, Types.AuthUserQueryVariables>(
    AuthUserDocument,
    options
  );
}
export function useAuthUserLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<
    Types.AuthUserQuery,
    Types.AuthUserQueryVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useLazyQuery<Types.AuthUserQuery, Types.AuthUserQueryVariables>(
    AuthUserDocument,
    options
  );
}
export type AuthUserQueryHookResult = ReturnType<typeof useAuthUserQuery>;
export type AuthUserLazyQueryHookResult = ReturnType<
  typeof useAuthUserLazyQuery
>;
export type AuthUserQueryResult = Apollo.QueryResult<
  Types.AuthUserQuery,
  Types.AuthUserQueryVariables
>;
