/**
 * Shopify Media types
 */

export interface Image {
  id: string;
  url: string;
  altText: string | null;
  width: number;
  height: number;
}

export interface ImageEdge {
  node: Image;
}

export interface ImageConnection {
  edges: ImageEdge[];
}

/** Simplified image for variants/upsells */
export interface SimpleImage {
  url: string;
  altText: string | null;
}
