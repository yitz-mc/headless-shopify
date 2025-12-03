import { gql } from 'graphql-request';
import { PRODUCT_CARD_FRAGMENT } from '../fragments/product';

export const GET_COLLECTIONS = gql`
  query GetCollections($first: Int = 100) {
    collections(first: $first) {
      edges {
        node {
          id
          title
          handle
          description
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
`;

export const GET_COLLECTION_BY_HANDLE = gql`
  query GetCollectionByHandle($handle: String!) {
    collection(handle: $handle) {
      id
      title
      handle
      description
      descriptionHtml
      image {
        url
        altText
        width
        height
      }
    }
  }
`;

export const GET_COLLECTION_WITH_PRODUCTS = gql`
  ${PRODUCT_CARD_FRAGMENT}
  query GetCollectionWithProducts($handle: String!, $first: Int = 50) {
    collection(handle: $handle) {
      id
      title
      handle
      description
      descriptionHtml
      image {
        url
        altText
        width
        height
      }
      products(first: $first) {
        edges {
          node {
            ...ProductCardFragment
          }
        }
        pageInfo {
          hasNextPage
          endCursor
        }
      }
    }
  }
`;
