/**
 * Typed environment variables
 * Validates and exports environment variables with proper types
 */

function getEnvVar(key: string, required: boolean = true): string {
  const value = process.env[key];

  if (required && !value) {
    throw new Error(`Missing required environment variable: ${key}`);
  }

  return value || '';
}

// ============================================================================
// Shopify Configuration
// ============================================================================

export const env = {
  // Shopify Storefront API
  shopify: {
    storeDomain: getEnvVar('NEXT_PUBLIC_SHOPIFY_STORE_DOMAIN'),
    storefrontAccessToken: getEnvVar('NEXT_PUBLIC_SHOPIFY_STOREFRONT_ACCESS_TOKEN'),
    apiVersion: '2024-01',

    get endpoint() {
      return `https://${this.storeDomain}/api/${this.apiVersion}/graphql.json`;
    },
  },

  // App configuration
  app: {
    url: getEnvVar('NEXT_PUBLIC_APP_URL', false) || 'http://localhost:3000',
    env: (process.env.NODE_ENV || 'development') as 'development' | 'production' | 'test',

    get isDevelopment() {
      return this.env === 'development';
    },
    get isProduction() {
      return this.env === 'production';
    },
    get isTest() {
      return this.env === 'test';
    },
  },
} as const;

// Type for the env object
export type Env = typeof env;
