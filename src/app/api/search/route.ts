import { NextRequest, NextResponse } from 'next/server';
import { getPredictiveSearch } from '@/lib/shopify';

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const query = searchParams.get('q');
  const limit = parseInt(searchParams.get('limit') || '4', 10);

  if (!query) {
    return NextResponse.json({ products: [], collections: [], articles: [] });
  }

  try {
    const results = await getPredictiveSearch(query, limit);
    return NextResponse.json(results);
  } catch (error) {
    console.error('Search API error:', error);
    return NextResponse.json({ error: 'Search failed' }, { status: 500 });
  }
}
