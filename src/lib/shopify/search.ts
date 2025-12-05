import { getShopifyClient } from './client';
import { PREDICTIVE_SEARCH, SEARCH_PRODUCTS } from '@/graphql';

export interface SearchProduct {
  id: string;
  title: string;
  handle: string;
  availableForSale: boolean;
  featuredImage: {
    url: string;
    altText: string | null;
  } | null;
  priceRange: {
    minVariantPrice: {
      amount: string;
      currencyCode: string;
    };
  };
  compareAtPriceRange: {
    minVariantPrice: {
      amount: string;
      currencyCode: string;
    };
  };
  images?: {
    edges: Array<{
      node: {
        id: string;
        url: string;
        altText: string | null;
        width: number;
        height: number;
      };
    }>;
  };
}

export interface SearchCollection {
  id: string;
  title: string;
  handle: string;
  image: {
    url: string;
    altText: string | null;
  } | null;
}

export interface PredictiveSearchResult {
  products: SearchProduct[];
  collections: SearchCollection[];
}

interface PredictiveSearchResponse {
  predictiveSearch: PredictiveSearchResult;
}

interface SearchProductsResponse {
  search: {
    totalCount: number;
    edges: Array<{
      cursor: string;
      node: SearchProduct;
    }>;
    pageInfo: {
      hasNextPage: boolean;
      endCursor: string | null;
    };
  };
}

export async function getPredictiveSearch(
  query: string,
  limit: number = 4,
): Promise<PredictiveSearchResult> {
  const client = getShopifyClient();

  const data = await client.request<PredictiveSearchResponse>(PREDICTIVE_SEARCH, {
    query,
    limit,
  });

  return data.predictiveSearch;
}

export async function searchProducts(
  query: string,
  first: number = 12,
  after?: string,
): Promise<{
  products: SearchProduct[];
  totalCount: number;
  pageInfo: {
    hasNextPage: boolean;
    endCursor: string | null;
  };
}> {
  const client = getShopifyClient();

  const data = await client.request<SearchProductsResponse>(SEARCH_PRODUCTS, {
    query,
    first,
    after,
  });

  return {
    products: data.search.edges.map((edge) => edge.node),
    totalCount: data.search.totalCount,
    pageInfo: data.search.pageInfo,
  };
}
