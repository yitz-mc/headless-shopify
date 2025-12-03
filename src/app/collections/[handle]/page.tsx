import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { getShopifyClient } from '@/lib/shopify';
import { GET_COLLECTION_WITH_PRODUCTS } from '@/graphql';
import { ProductGrid } from '@/components/product';

interface CollectionPageProps {
  params: Promise<{
    handle: string;
  }>;
}

interface Collection {
  id: string;
  title: string;
  handle: string;
  description: string;
  descriptionHtml: string;
  image: {
    url: string;
    altText: string;
    width: number;
    height: number;
  } | null;
  products: {
    edges: Array<{
      node: {
        id: string;
        title: string;
        handle: string;
        availableForSale: boolean;
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
        images: {
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
      };
    }>;
    pageInfo: {
      hasNextPage: boolean;
      endCursor: string;
    };
  };
}

interface CollectionResult {
  collection: Collection | null;
  error: string | null;
}

async function getCollection(handle: string): Promise<CollectionResult> {
  const client = getShopifyClient();

  try {
    const data = await client.request<{ collection: Collection | null }>(
      GET_COLLECTION_WITH_PRODUCTS,
      { handle, first: 50 }
    );

    // Collection is null = it doesn't exist (404)
    // Collection exists = success
    return { collection: data.collection, error: null };
  } catch (error) {
    // API error - don't 404, show error state
    console.error('Error fetching collection:', error);
    return { collection: null, error: 'Failed to load collection' };
  }
}

function formatHandle(handle: string): string {
  return handle
    .split('-')
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');
}

export async function generateMetadata({ params }: CollectionPageProps): Promise<Metadata> {
  const { handle } = await params;
  const { collection, error } = await getCollection(handle);

  if (error) {
    return {
      title: `${formatHandle(handle)} | Modular Closets`,
    };
  }

  if (!collection) {
    return {
      title: 'Collection Not Found',
    };
  }

  return {
    title: `${collection.title} | Modular Closets`,
    description: collection.description || `Shop our ${collection.title} collection`,
  };
}

export default async function CollectionPage({ params }: CollectionPageProps) {
  const { handle } = await params;
  const { collection, error } = await getCollection(handle);

  // Only 404 if the API responded successfully but collection doesn't exist
  if (!error && !collection) {
    notFound();
  }

  // API error - show error state but still render the page structure
  if (error || !collection) {
    return (
      <div className="collection-page">
        <header className="collection-header bg-gray-50 py-8">
          <div className="container mx-auto px-4">
            <h1 className="text-3xl font-bold text-center">{formatHandle(handle)}</h1>
          </div>
        </header>

        <section className="py-16">
          <div className="container mx-auto px-4 text-center">
            <p className="text-gray-500">
              Unable to load products. Please try again later.
            </p>
          </div>
        </section>
      </div>
    );
  }

  const products = collection.products.edges.map((edge) => edge.node);

  return (
    <div className="collection-page">
      {/* Collection Header */}
      <header className="collection-header bg-gray-50 py-8">
        <div className="container mx-auto px-4">
          <h1 className="text-3xl font-bold text-center">{collection.title}</h1>
          {collection.description && (
            <p className="mt-2 text-center text-gray-600 max-w-2xl mx-auto">
              {collection.description}
            </p>
          )}
        </div>
      </header>

      {/* Product Grid */}
      <section className="py-8">
        <div className="container mx-auto px-4">
          <ProductGrid products={products} collectionHandle={collection.handle} />
        </div>
      </section>
    </div>
  );
}
