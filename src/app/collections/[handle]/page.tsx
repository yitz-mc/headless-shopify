import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { getShopifyClient, getLightboxComparison } from '@/lib/shopify';
import { GET_COLLECTION_WITH_PRODUCTS } from '@/graphql';
import { ProductGrid } from '@/components/product';
import {
  WhereToStart,
  TrustpilotReviews,
  VistaHero,
  InfoCards,
  AdditionalResources,
  CollectionHero,
  AltoHero,
  SharedPanelAlto,
  LuxuriousDetailsAlto,
  BuildClosetAlto,
  AltoGallery,
} from '@/components/sections';
import { getTrustpilotReviews } from '@/lib/shopify/trustpilot';
import type { Collection } from '@/types';

interface CollectionPageProps {
  params: Promise<{
    handle: string;
  }>;
}

interface CollectionResult {
  collection: Collection | null;
  error: string | null;
}

// Collections that use the Vista layout
const VISTA_LAYOUT_COLLECTIONS = ['vista'];
// Collections that use the Alto layout
const ALTO_LAYOUT_COLLECTIONS = ['alto-closet-system'];

async function getCollection(handle: string): Promise<CollectionResult> {
  const client = getShopifyClient();

  try {
    const data = await client.request<{ collection: Collection | null }>(
      GET_COLLECTION_WITH_PRODUCTS,
      { handle, first: 50 },
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
  const isVistaLayout = VISTA_LAYOUT_COLLECTIONS.includes(handle);
  const isAltoLayout = ALTO_LAYOUT_COLLECTIONS.includes(handle);

  // Fetch collection and Trustpilot reviews in parallel
  const [collectionResult, trustpilotData] = await Promise.all([
    getCollection(handle),
    getTrustpilotReviews(),
  ]);

  const { collection, error } = collectionResult;

  // Only 404 if the API responded successfully but collection doesn't exist
  if (!error && !collection) {
    notFound();
  }

  // API error - show error state but still render the page structure
  if (error || !collection) {
    return (
      <div className='collection-page'>
        <header className='collection-header bg-gray-50 py-8'>
          <div className='container mx-auto px-4'>
            <h1 className='text-3xl font-bold text-center'>{formatHandle(handle)}</h1>
          </div>
        </header>

        <section className='py-16'>
          <div className='container mx-auto px-4 text-center'>
            <p className='text-gray-500'>Unable to load products. Please try again later.</p>
          </div>
        </section>
      </div>
    );
  }

  const products = collection.products.edges.map((edge) => edge.node);

  // Vista Layout: VistaHero + InfoCards + ProductGrid + WhereToStart + TrustpilotReviews
  if (isVistaLayout && trustpilotData) {
    const { heading, reviews } = trustpilotData;
    return (
      <div className='collection-page'>
        {/* Vista Hero Banner */}
        <VistaHero />

        {/* Info Cards */}
        <InfoCards />

        {/* Product Grid */}
        <section className='py-8'>
          <div className='container mx-auto px-4'>
            <ProductGrid products={products} collectionHandle={collection.handle} />
          </div>
        </section>

        {/* Where To Start */}
        <WhereToStart variant='product' />

        {/* Trustpilot Reviews */}
        <TrustpilotReviews
          heading={heading.heading}
          ratingName={heading.ratingName}
          amountOfStars={heading.amountOfStars}
          amountOfReviews={heading.amountOfReviews}
          buttonLink={heading.buttonLink}
          buttonText={heading.buttonText}
          reviews={reviews}
        />

        {/* Additional Resources */}
        <AdditionalResources />
      </div>
    );
  }

  // Alto Layout: AltoHero + InfoCards + ProductGrid + WhereToStart + TrustpilotReviews
  if (isAltoLayout && trustpilotData) {
    const { heading, reviews } = trustpilotData;
    const [lightboxData, altoCollectionResult] = await Promise.all([
      getLightboxComparison(),
      getCollection('alto-collection'),
    ]);
    const altoCollectionProducts = altoCollectionResult.collection?.products.edges.map((edge) => edge.node) || [];

    return (
      <div className='collection-page'>
        {/* Alto Hero Banner */}
        <AltoHero />

        {/* Info Cards */}
        <InfoCards variant='alto' />

        {/* Shared Panel Alto */}
        <SharedPanelAlto comparisonFeatures={lightboxData.features} />

        {/* Luxurious Details */}
        <LuxuriousDetailsAlto />

        {/* Build Closet Alto - Components Guide */}
        <BuildClosetAlto products={altoCollectionProducts} />

        {/* Alto Gallery - Real Customer Closets */}
        <AltoGallery />

        {/* Where To Start */}
        <WhereToStart variant='chooseCategory' showHeading={false} backgroundColor='#ffffff' />

        {/* Trustpilot Reviews */}
        <TrustpilotReviews
          heading={heading.heading}
          ratingName={heading.ratingName}
          amountOfStars={heading.amountOfStars}
          amountOfReviews={heading.amountOfReviews}
          buttonLink={heading.buttonLink}
          buttonText={heading.buttonText}
          reviews={reviews}
        />
      </div>
    );
  }

  // Default Layout: CollectionHero + ProductGrid + WhereToStart + Trustpilot
  const { heading, reviews } = trustpilotData;
  return (
    <div className='collection-page'>
      {/* Collection Hero (breadcrumb + title) */}
      <CollectionHero title={collection.title} description={collection.descriptionHtml} />

      {/* Product Grid */}
      <section className='py-8'>
        <div className='container mx-auto px-4'>
          <ProductGrid products={products} collectionHandle={collection.handle} />
        </div>
      </section>

      {/* Where To Start */}
      <WhereToStart variant='chooseCategory' showHeading={false} backgroundColor='#ffffff' />

      {/* Trustpilot Reviews */}
      <TrustpilotReviews
        heading={heading.heading}
        ratingName={heading.ratingName}
        amountOfStars={heading.amountOfStars}
        amountOfReviews={heading.amountOfReviews}
        buttonLink={heading.buttonLink}
        buttonText={heading.buttonText}
        reviews={reviews}
      />
    </div>
  );
}
