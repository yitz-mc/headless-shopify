import { Metadata } from 'next';
import { searchProducts } from '@/lib/shopify';
import { SearchProductCard } from './SearchProductCard';

export const metadata: Metadata = {
  title: 'Search | Modular Closets',
  description: 'Search for closet systems, organizers, and accessories at Modular Closets.',
};

interface SearchPageProps {
  searchParams: Promise<{ q?: string }>;
}

export default async function SearchPage({ searchParams }: SearchPageProps) {
  const params = await searchParams;
  const query = params.q || '';

  const { products, totalCount } = query
    ? await searchProducts(query, 24)
    : { products: [], totalCount: 0 };

  return (
    <main className='container mx-auto px-4 py-8'>
      {/* Header */}
      <div className='text-center mb-8'>
        <h1 className='heading-druk text-[40px] md:text-[64px] uppercase text-[#1c1c1e] mb-4'>
          {query ? 'Search Results' : 'Search'}
        </h1>
        {query && (
          <p className='text-gray-600'>
            {totalCount === 0
              ? `No results found for "${query}"`
              : totalCount === 1
                ? `1 result for "${query}"`
                : `${totalCount} results for "${query}"`}
          </p>
        )}
      </div>

      {/* Search Form - centered */}
      <form method='get' action='/search' className='mb-12'>
        <div className='relative max-w-md mx-auto'>
          <input
            key={query}
            type='text'
            name='q'
            defaultValue={query}
            placeholder='Enter keywords...'
            className='w-full h-12 pl-12 pr-4 text-base border border-gray-300 rounded-lg focus:outline-none focus:border-[#1c1c1e] focus:ring-1 focus:ring-[#1c1c1e]'
          />
          <SearchIcon className='absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400' />
        </div>
      </form>

      {/* Results Grid - 3 per row on desktop */}
      {products.length > 0 ? (
        <div className='grid grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6'>
          {products.map((product) => (
            <SearchProductCard key={product.id} product={product} />
          ))}
        </div>
      ) : query ? (
        <div className='text-center py-12'>
          <p className='text-gray-500 mb-4'>No products found matching your search.</p>
          <p className='text-gray-400 text-sm'>
            Try using different keywords or browse our collections.
          </p>
        </div>
      ) : (
        <div className='text-center py-12'>
          <p className='text-gray-500'>Enter a search term to find products.</p>
        </div>
      )}
    </main>
  );
}

function SearchIcon({ className }: { className?: string }) {
  return (
    <svg className={className} fill='none' stroke='currentColor' viewBox='0 0 24 24'>
      <path
        strokeLinecap='round'
        strokeLinejoin='round'
        strokeWidth={1.5}
        d='M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z'
      />
    </svg>
  );
}
