import { gql } from 'graphql-request';

export const GET_CUSTOMER_CLOSETS = gql`
  query GetCustomerClosets {
    metaobjects(type: "real_customer_closets", first: 20) {
      nodes {
        id
        fields {
          key
          value
          reference {
            __typename
            ... on MediaImage {
              image {
                url(transform: { maxWidth: 800 })
                altText
                width
                height
              }
            }
            ... on Video {
              sources {
                url
                mimeType
              }
              previewImage {
                url
              }
            }
          }
        }
      }
    }
  }
`;
