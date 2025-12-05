import { gql } from 'graphql-request';

export const GET_GALLERY_IMAGES = gql`
  query GetGalleryImages($type: String!, $first: Int!, $after: String) {
    metaobjects(type: $type, first: $first, after: $after, sortKey: "updated_at", reverse: true) {
      edges {
        cursor
        node {
          id
          fields {
            key
            value
            reference {
              __typename
              ... on MediaImage {
                image {
                  small: url(transform: { maxWidth: 960 })
                  full: url(transform: { maxWidth: 2048 })
                  altText
                  width
                  height
                }
              }
            }
          }
        }
      }
      pageInfo {
        hasNextPage
      }
    }
  }
`;
