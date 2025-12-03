import { gql } from 'graphql-request';
import { PRODUCT_FRAGMENT, PRODUCT_CARD_FRAGMENT } from '../fragments/product';

export const GET_PRODUCT_BY_HANDLE = gql`
  ${PRODUCT_FRAGMENT}
  query GetProductByHandle($handle: String!) {
    product(handle: $handle) {
      ...ProductFragment
    }
  }
`;

export const GET_PRODUCTS = gql`
  ${PRODUCT_CARD_FRAGMENT}
  query GetProducts($first: Int = 20, $after: String) {
    products(first: $first, after: $after) {
      pageInfo {
        hasNextPage
        hasPreviousPage
        startCursor
        endCursor
      }
      edges {
        cursor
        node {
          ...ProductCardFragment
        }
      }
    }
  }
`;

export const GET_COLLECTION_PRODUCTS = gql`
  ${PRODUCT_CARD_FRAGMENT}
  query GetCollectionProducts(
    $handle: String!
    $first: Int = 20
    $after: String
    $sortKey: ProductCollectionSortKeys
    $reverse: Boolean
  ) {
    collection(handle: $handle) {
      id
      title
      description
      handle
      image {
        url
        altText
        width
        height
      }
      products(first: $first, after: $after, sortKey: $sortKey, reverse: $reverse) {
        pageInfo {
          hasNextPage
          hasPreviousPage
          startCursor
          endCursor
        }
        edges {
          cursor
          node {
            ...ProductCardFragment
          }
        }
      }
    }
  }
`;
