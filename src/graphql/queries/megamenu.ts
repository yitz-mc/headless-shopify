import { gql } from 'graphql-request';

export const GET_MEGAMENU = gql`
  query GetMegamenu {
    metaobjects(type: "megamenu", first: 20) {
      nodes {
        id
        handle
        fields {
          key
          value
          reference {
            ... on MediaImage {
              image {
                url
                altText
                width
                height
              }
            }
          }
        }
      }
    }
  }
`;
