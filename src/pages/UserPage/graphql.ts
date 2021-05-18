import { gql } from '@apollo/client';

export const USER_QUERY = gql`
  query GetUser($uid: String!) {
    user(uid: $uid) {
      uid
      email
      emailVerified
    }
  }
`;
