import { gql } from '@apollo/client';

export const USER_QUERY = gql`
  query GetUser($id: String!) {
    user(id: $id) {
      id
      username
      created_at
      updated_at
    }
  }
`;
