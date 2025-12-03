import type { CodegenConfig } from '@graphql-codegen/cli';

const config: CodegenConfig = {
  overwrite: true,
  schema: {
    [`https://${process.env.NEXT_PUBLIC_SHOPIFY_STORE_DOMAIN}/api/2024-01/graphql.json`]: {
      headers: {
        'X-Shopify-Storefront-Access-Token': process.env.NEXT_PUBLIC_SHOPIFY_STOREFRONT_ACCESS_TOKEN!,
        'Content-Type': 'application/json',
      },
    },
  },
  documents: 'src/graphql/**/*.ts',
  generates: {
    'src/lib/shopify/generated.ts': {
      plugins: [
        'typescript',
        'typescript-operations',
        'typescript-graphql-request',
      ],
      config: {
        rawRequest: false,
        skipTypename: false,
        enumsAsTypes: true,
        dedupeFragments: true,
      },
    },
  },
};

export default config;
