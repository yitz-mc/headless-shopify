/**
 * Shopify Variant types
 */

import type { Money } from './money';
import type { Image, SimpleImage } from './media';
import type { Metafield } from './metafield';

export interface SelectedOption {
  name: string;
  value: string;
}

export interface VariantMetafields {
  // Section 1 - Material/Color
  material?: Metafield | null;
  variantColor?: Metafield | null;
  finish?: Metafield | null;
  // Section 2 - Dimensions
  height?: Metafield | null;
  width?: Metafield | null;
  depth?: Metafield | null;
  internalHeight?: Metafield | null;
  internalWidth?: Metafield | null;
  hangingSpace?: Metafield | null;
  shelfSpace?: Metafield | null;
  // Section 3 - Item Details
  mountType?: Metafield | null;
  numberOfRods?: Metafield | null;
  numberOfFixedShelves?: Metafield | null;
  numberOfAdjustableShelves?: Metafield | null;
  numberOfDrawers?: Metafield | null;
  totalWeightCapacity?: Metafield | null;
  hardwareIncluded?: Metafield | null;
}

export interface UpsellVariantProduct {
  id: string;
  title: string;
  handle: string;
  description?: string;
}

export interface UpsellVariant {
  id: string;
  title: string;
  availableForSale: boolean;
  price: Money;
  image: SimpleImage | null;
  product: UpsellVariantProduct;
}

export interface ClosetAddOnsMetafield {
  reference?: {
    fields: Array<{
      key: string;
      value: string | null;
      references?: {
        nodes: UpsellVariant[];
      } | null;
    }>;
  } | null;
}

export interface Variant extends VariantMetafields {
  id: string;
  title: string;
  availableForSale: boolean;
  quantityAvailable: number | null;
  sku: string;
  selectedOptions: SelectedOption[];
  price: Money;
  compareAtPrice: Money | null;
  image: Image | null;
  closetAddOns?: ClosetAddOnsMetafield | null;
}

export interface VariantEdge {
  node: Variant;
}

export interface VariantConnection {
  edges: VariantEdge[];
}
