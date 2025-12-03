/**
 * Centralized route registry - single source of truth for all internal paths
 * All links, redirects, and page rendering should reference this
 */

export const routes = {
  // Main pages
  home: '/',
  account: '/account',
  cart: '/cart',
  search: '/search',

  // Design services
  designQuiz: '/pages/closet-design-quiz',
  designTool: '/pages/closet-design-tool',

  // Category pages
  chooseCategory: '/pages/choose-category',

  // Collections
  collections: {
    vista: '/collections/vista',
    alto: '/collections/alto-closet-system',
    milanoInternal: '/collections/milano-internal',
    preDesignedClosets: '/collections/pre-designed-closets',
    accessories: '/collections/accessories',
    vistaParts: '/collections/vista-closet-parts',
    altoParts: '/collections/alto-shopping-collection',
    wardrobes: '/collections/wardrobe-closet',
    otherSpaces: '/collections/other-spaces',
  },

  // Info pages
  pages: {
    garages: '/pages/garages',
    mudrooms: '/pages/mudrooms',
    contractors: '/pages/contractors',
    gallery: '/pages/gallery',
    assemblyInstructions: '/pages/assembly-and-install',
    faqs: '/pages/frequently-asked-questions',
    shippingReturns: '/pages/shipping-returns-warranty',
    warranty: '/pages/shipping-returns-warranty#warranty',
    buyNowShipLater: '/pages/buy-now-ship-later',
    safetyGuidelines: '/pages/safety-and-assembly-guidelines',
    contactUs: '/pages/contact-us',
    privacyPolicy: '/pages/privacy-policy',
  },

  // Policies
  policies: {
    termsOfService: '/policies/terms-of-service',
  },
} as const;

// Type for route keys
export type RouteKey = keyof typeof routes;

// Helper to check if a URL is external
export function isExternalUrl(url: string): boolean {
  return url.startsWith('http://') || url.startsWith('https://');
}

// Resolve a route key like "collections.vista" or "designQuiz" to actual path
export function resolveRoute(key: string): string {
  const parts = key.split('.');
  let result: unknown = routes;

  for (const part of parts) {
    if (result && typeof result === 'object' && part in result) {
      result = (result as Record<string, unknown>)[part];
    } else {
      console.warn(`Route not found: ${key}`);
      return '/';
    }
  }

  if (typeof result !== 'string') {
    console.warn(`Route "${key}" does not resolve to a string`);
    return '/';
  }

  return result;
}
