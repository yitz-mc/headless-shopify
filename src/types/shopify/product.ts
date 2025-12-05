/**
 * Shopify Product types
 */

import type { Money, MoneyRange } from './money';
import type { ImageConnection, Image } from './media';
import type { Metafield, AssemblyInstructionsMetafield } from './metafield';
import type { VariantConnection } from './variant';

export interface ProductOption {
  id: string;
  name: string;
  values: string[];
}

export interface Product {
  id: string;
  title: string;
  handle: string;
  description: string;
  descriptionHtml: string;
  availableForSale: boolean;
  productType: string;
  vendor: string;
  tags: string[];
  options: ProductOption[];
  priceRange: MoneyRange;
  compareAtPriceRange?: MoneyRange;
  specifications?: Metafield | null;
  redirect?: Metafield | null;
  assemblyInstructions?: AssemblyInstructionsMetafield | null;
  images: ImageConnection;
  variants: VariantConnection;
}

/** Simplified product for cards/grids */
export interface ProductCard {
  id: string;
  title: string;
  handle: string;
  availableForSale: boolean;
  priceRange: {
    minVariantPrice: Money;
  };
  compareAtPriceRange?: {
    minVariantPrice: Money;
  };
  images: {
    edges: Array<{
      node: Image;
    }>;
  };
  variants?: {
    edges: Array<{
      node: {
        id: string;
      };
    }>;
  };
}

/** Minimal product reference (used in variants) */
export interface ProductReference {
  id: string;
  title: string;
  handle: string;
}
