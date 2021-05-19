import { gql } from '@apollo/client';

export const USER_QUERY = gql`
  query userQuery($uid: String!) {
    user(uid: $uid) {
      uid
      email
    }
  }
`;
