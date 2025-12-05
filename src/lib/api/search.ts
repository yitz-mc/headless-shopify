import type { PredictiveSearchResult } from '@/lib/shopify';

export async function fetchPredictiveSearch(
  query: string,
  limit: number = 4,
): Promise<PredictiveSearchResult> {
  const response = await fetch(`/api/search?q=${encodeURIComponent(query)}&limit=${limit}`);
  return response.json();
}
