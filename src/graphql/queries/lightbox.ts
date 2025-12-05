import { gql } from 'graphql-request';

export const GET_LIGHTBOX_COMPARISON = gql`
  query GetLightboxComparison {
    metaobjects(type: "lightbox", first: 50) {
      nodes {
        id
        fields {
          key
          value
        }
      }
    }
  }
`;
