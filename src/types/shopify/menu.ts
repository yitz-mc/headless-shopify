/**
 * Shopify Menu/Navigation types
 */

export interface MenuItem {
  id: string;
  title: string;
  url: string;
  items: MenuItem[];
}

export interface Menu {
  id: string;
  handle: string;
  title: string;
  items: MenuItem[];
}
