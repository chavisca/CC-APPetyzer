import { gql } from '@apollo/client';

// QUERY USER 
export const QUERY_USER = gql`
  query user($username: String!) {
    user(username: $username) {
      _id
      username
      email
      favorites {
        _id
        AddedAt
      }
    }
  }
`;

export const QUERY_ME = gql`
  query me {
    me {
      _id
      username
      email
      favorites
    }
  }
`;

