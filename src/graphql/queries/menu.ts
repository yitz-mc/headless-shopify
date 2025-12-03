import { gql } from 'graphql-request';

export const GET_MENU = gql`
  query GetMenu($handle: String!) {
    menu(handle: $handle) {
      id
      handle
      title
      items {
        id
        title
        url
        type
        items {
          id
          title
          url
          type
          items {
            id
            title
            url
            type
          }
        }
      }
    }
  }
`;
