/**
 * Shopify Collection types
 */

import type { Image } from './media';
import type { ProductCard } from './product';

export interface Collection {
  id: string;
  title: string;
  handle: string;
  description: string;
  descriptionHtml?: string;
  image?: Image | null;
  products: {
    edges: Array<{
      node: ProductCard;
    }>;
    pageInfo?: {
      hasNextPage: boolean;
      endCursor: string;
    };
  };
}

export interface CollectionEdge {
  node: Collection;
}

export interface CollectionConnection {
  edges: CollectionEdge[];
}
