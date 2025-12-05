'use client';

import { useState, useEffect, useRef, useCallback } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import type { PredictiveSearchResult } from '@/lib/shopify';
import { fetchPredictiveSearch } from '@/lib/api';

interface PredictiveSearchProps {
  isOpen: boolean;
  onClose: () => void;
  headerBottom: number;
}

function debounce<T extends (...args: Parameters<T>) => void>(
  func: T,
  wait: number,
): (...args: Parameters<T>) => void {
  let timeout: NodeJS.Timeout;
  return (...args: Parameters<T>) => {
    clearTimeout(timeout);
    timeout = setTimeout(() => func(...args), wait);
  };
}

export function PredictiveSearch({ isOpen, onClose, headerBottom }: PredictiveSearchProps) {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<PredictiveSearchResult | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const router = useRouter();

  useEffect(() => {
    if (isOpen && inputRef.current) {
      setTimeout(() => inputRef.current?.focus(), 50);
    }
    if (!isOpen) {
      setQuery('');
      setResults(null);
    }
  }, [isOpen]);

  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener('keydown', handleEscape);
    }

    return () => {
      document.removeEventListener('keydown', handleEscape);
    };
  }, [isOpen, onClose]);

  const fetchResults = useCallback(async (searchQuery: string) => {
    if (!searchQuery.trim()) {
      setResults(null);
      return;
    }

    setIsLoading(true);
    try {
      const data = await fetchPredictiveSearch(searchQuery, 4);
      setResults(data);
    } catch (error) {
      console.error('Search error:', error);
    } finally {
      setIsLoading(false);
    }
  }, []);

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const debouncedSearch = useCallback(debounce(fetchResults, 300), [fetchResults]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setQuery(value);
    debouncedSearch(value);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (query.trim()) {
      router.push(`/search?q=${encodeURIComponent(query)}`);
      onClose();
    }
  };

  const handleLinkClick = () => {
    setQuery('');
    setResults(null);
    onClose();
  };

  const formatPrice = (amount: string, currencyCode: string) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: currencyCode,
    }).format(parseFloat(amount));
  };

  const hasResults = results && (results.products.length > 0 || results.collections.length > 0);

  if (!isOpen) return null;

  return (
    <>
      {/* Mobile backdrop - separate from container */}
      <div
        className='lg:hidden fixed inset-0 bg-black/30 z-[99]'
        style={{ top: headerBottom }}
        onClick={onClose}
      />

      {/* Mobile: full-width search below header */}
      <div className='lg:hidden fixed left-0 right-0 z-[100] px-4' style={{ top: headerBottom }}>
        <form
          onSubmit={handleSubmit}
          className='relative w-full bg-white rounded-xl shadow-lg'
          onClick={(e) => e.stopPropagation()}
        >
          <div className='relative'>
            <button
              type='submit'
              className='absolute left-4 top-1/2 -translate-y-1/2 z-10'
              aria-label='Search'
            >
              <SearchIcon className='w-5 h-5 text-[#1c1c1e]' />
            </button>
            <input
              ref={inputRef}
              type='text'
              value={query}
              onChange={handleInputChange}
              placeholder='Search'
              className='w-full h-12 pl-12 pr-12 text-base border border-[#d8d8db] rounded-xl bg-white focus:outline-none focus:border-[#1c1c1e] focus:border-2'
            />
            <button
              type='button'
              onClick={onClose}
              className='absolute right-3 top-1/2 -translate-y-1/2 p-1.5 bg-gray-200 rounded-full hover:bg-gray-300'
              aria-label='Close search'
            >
              <CloseIcon className='w-4 h-4 text-[#1c1c1e]' />
            </button>
          </div>
          {/* Mobile Results */}
          {query.trim() && (
            <div className='border-t border-[#d8d8db] max-h-[calc(100vh-150px)] overflow-y-auto'>
              <div className='p-4'>
                {isLoading ? (
                  <div className='py-4 text-center text-gray-500 text-sm'>Searching...</div>
                ) : hasResults ? (
                  <div className='space-y-6'>
                    {results.products.length > 0 && (
                      <div>
                        <h3 className='text-lg font-semibold text-[#1c1c1e] mb-4'>Products</h3>
                        <ul className='space-y-4'>
                          {results.products.map((product) => (
                            <li key={product.id}>
                              <Link
                                href={`/products/${product.handle}`}
                                onClick={handleLinkClick}
                                className='flex items-start gap-3 group'
                              >
                                {product.featuredImage && (
                                  <div className='w-[70px] h-[70px] relative flex-shrink-0 bg-gray-100'>
                                    <Image
                                      src={product.featuredImage.url}
                                      alt={product.featuredImage.altText || product.title}
                                      fill
                                      className='object-contain'
                                    />
                                  </div>
                                )}
                                <div className='flex-1 min-w-0 pt-1'>
                                  <div className='text-sm text-[#333] group-hover:underline leading-snug mb-1'>
                                    {product.title}
                                  </div>
                                  <div className='text-sm text-[#333]'>
                                    {formatPrice(
                                      product.priceRange.minVariantPrice.amount,
                                      product.priceRange.minVariantPrice.currencyCode,
                                    )}
                                  </div>
                                </div>
                              </Link>
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}
                    {results.collections.length > 0 && (
                      <div>
                        <h3 className='text-lg font-semibold text-[#1c1c1e] mb-4'>Collections</h3>
                        <ul className='space-y-3'>
                          {results.collections.map((collection) => (
                            <li key={collection.id}>
                              <Link
                                href={`/collections/${collection.handle}`}
                                onClick={handleLinkClick}
                                className='text-sm text-[#333] hover:underline'
                              >
                                {collection.title}
                              </Link>
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}
                    <button
                      onClick={handleSubmit}
                      className='inline-flex items-center gap-2 text-sm text-[#E8927C]'
                    >
                      <span className='border-b border-current'>View all results</span>
                      <ArrowIcon className='w-4 h-4' />
                    </button>
                  </div>
                ) : (
                  <div className='py-4 text-center text-gray-500 text-sm'>No results found</div>
                )}
              </div>
            </div>
          )}
        </form>
      </div>

      {/* Desktop backdrop */}
      <div className='hidden lg:block fixed inset-0 z-[9]' onClick={onClose} />

      {/* Desktop: inline search next to icons */}
      <div className='hidden lg:flex absolute top-0 bottom-0 right-[100px] items-center z-10'>
        <form onSubmit={handleSubmit} className='relative w-[280px] bg-white'>
          <div className='relative'>
            <button
              type='submit'
              className='absolute left-4 top-1/2 -translate-y-1/2 z-10'
              aria-label='Search'
            >
              <SearchIcon className='w-5 h-5 text-[#1c1c1e]' />
            </button>
            <input
              type='text'
              value={query}
              onChange={handleInputChange}
              placeholder='Search'
              className='w-full h-11 pl-12 pr-12 text-sm border border-[#d8d8db] rounded-xl bg-[#f4f4f4] focus:outline-none focus:border-[#1c1c1e] focus:border-2 focus:bg-white'
            />
            <button
              type='button'
              onClick={onClose}
              className='absolute right-3 top-1/2 -translate-y-1/2 p-1.5 bg-gray-200 rounded-full hover:bg-gray-300'
              aria-label='Close search'
            >
              <CloseIcon className='w-4 h-4 text-[#1c1c1e]' />
            </button>
          </div>

          {/* Results Dropdown */}
          {query.trim() && (
            <div
              className='absolute left-0 right-0 lg:w-[280px] bg-white border border-[#d8d8db] rounded-b-xl shadow-lg max-h-[calc(100vh-150px)] overflow-y-auto'
              style={{ top: '100%', marginTop: '-1px' }}
            >
              <div className='p-4'>
                {isLoading ? (
                  <div className='py-4 text-center text-gray-500 text-sm'>Searching...</div>
                ) : hasResults ? (
                  <div className='space-y-6'>
                    {/* Products Section */}
                    {results.products.length > 0 && (
                      <div>
                        <h3 className='text-lg font-semibold text-[#1c1c1e] mb-4'>Products</h3>
                        <ul className='space-y-4'>
                          {results.products.map((product) => (
                            <li key={product.id}>
                              <Link
                                href={`/products/${product.handle}`}
                                onClick={handleLinkClick}
                                className='flex items-start gap-3 group'
                              >
                                {product.featuredImage && (
                                  <div className='w-[80px] h-[80px] relative flex-shrink-0 bg-gray-100'>
                                    <Image
                                      src={product.featuredImage.url}
                                      alt={product.featuredImage.altText || product.title}
                                      fill
                                      className='object-contain'
                                    />
                                  </div>
                                )}
                                <div className='flex-1 min-w-0 pt-1'>
                                  <div className='text-sm text-[#333] group-hover:underline leading-snug mb-1'>
                                    {product.title}
                                  </div>
                                  <div className='text-sm text-[#333]'>
                                    {formatPrice(
                                      product.priceRange.minVariantPrice.amount,
                                      product.priceRange.minVariantPrice.currencyCode,
                                    )}
                                    {parseFloat(
                                      product.compareAtPriceRange.minVariantPrice.amount,
                                    ) > parseFloat(product.priceRange.minVariantPrice.amount) && (
                                      <span className='ml-2 text-[#767676] line-through'>
                                        {formatPrice(
                                          product.compareAtPriceRange.minVariantPrice.amount,
                                          product.compareAtPriceRange.minVariantPrice.currencyCode,
                                        )}
                                      </span>
                                    )}
                                  </div>
                                </div>
                              </Link>
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}

                    {/* Collections Section */}
                    {results.collections.length > 0 && (
                      <div>
                        <h3 className='text-lg font-semibold text-[#1c1c1e] mb-4'>Collections</h3>
                        <ul className='space-y-4'>
                          {results.collections.map((collection) => (
                            <li key={collection.id}>
                              <Link
                                href={`/collections/${collection.handle}`}
                                onClick={handleLinkClick}
                                className='flex items-start gap-3 group'
                              >
                                {collection.image && (
                                  <div className='w-[80px] h-[80px] relative flex-shrink-0 bg-gray-100'>
                                    <Image
                                      src={collection.image.url}
                                      alt={collection.image.altText || collection.title}
                                      fill
                                      className='object-cover'
                                    />
                                  </div>
                                )}
                                <div className='flex-1 min-w-0 pt-1'>
                                  <div className='text-sm text-[#333] group-hover:underline leading-snug'>
                                    {collection.title}
                                  </div>
                                </div>
                              </Link>
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}

                    {/* View All Button */}
                    <div className='pt-2'>
                      <button
                        onClick={handleSubmit}
                        className='inline-flex items-center gap-2 text-sm text-[#E8927C] hover:text-[#d4826d]'
                      >
                        <span className='border-b border-current'>View all results</span>
                        <ArrowIcon className='w-4 h-4' />
                      </button>
                    </div>
                  </div>
                ) : (
                  <div className='py-4 text-center text-gray-500 text-sm'>
                    No results found for &quot;{query}&quot;
                  </div>
                )}
              </div>
            </div>
          )}
        </form>
      </div>
    </>
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

function CloseIcon({ className }: { className?: string }) {
  return (
    <svg className={className} fill='none' stroke='currentColor' viewBox='0 0 24 24'>
      <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M6 18L18 6M6 6l12 12' />
    </svg>
  );
}

function ArrowIcon({ className }: { className?: string }) {
  return (
    <svg className={className} fill='none' stroke='currentColor' viewBox='0 0 24 24'>
      <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M9 5l7 7-7 7' />
    </svg>
  );
}
