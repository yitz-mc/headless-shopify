import { shopifyClient } from './client';
import { GET_TRUSTPILOT_REVIEWS } from '@/graphql/queries/trustpilot';
import type { MetaobjectField, MetaobjectNode, TrustpilotHeading, TrustpilotReview } from '@/types';

interface TrustpilotResponse {
  heading: {
    fields: MetaobjectField[];
  } | null;
  reviews: {
    nodes: MetaobjectNode[];
  };
}

export type { TrustpilotHeading, TrustpilotReview };

function parseFields(fields: MetaobjectField[]): Record<string, string> {
  return fields.reduce(
    (acc, field) => {
      if (field.value !== null) {
        acc[field.key] = field.value;
      }
      return acc;
    },
    {} as Record<string, string>,
  );
}

function formatDate(dateString: string): string {
  try {
    // Parse date string as local date to avoid timezone offset issues
    // Input format: "2024-01-15" or similar
    const parts = dateString.split('-');
    if (parts.length === 3) {
      const year = parseInt(parts[0], 10);
      const month = parseInt(parts[1], 10) - 1; // JS months are 0-indexed
      const day = parseInt(parts[2], 10);
      const date = new Date(year, month, day);
      return date.toLocaleDateString('en-US', {
        month: 'short',
        day: 'numeric',
        year: 'numeric',
      });
    }
    return dateString;
  } catch {
    return dateString;
  }
}

export async function getTrustpilotReviews(): Promise<{
  heading: TrustpilotHeading;
  reviews: TrustpilotReview[];
}> {
  try {
    const data = await shopifyClient.request<TrustpilotResponse>(GET_TRUSTPILOT_REVIEWS);

    // Parse heading
    const headingFields = data.heading ? parseFields(data.heading.fields) : {};
    const heading: TrustpilotHeading = {
      ratingName: headingFields.rating_name || 'Excellent',
      amountOfStars: headingFields.amount_of_stars || '4.7',
      amountOfReviews: headingFields.amount_of_reviews || '3,744',
      heading: headingFields.heading || 'Over 100,000 closets sold to happy customers.',
      buttonLink:
        headingFields.button_link || 'https://www.trustpilot.com/review/modularclosets.com',
      buttonText: headingFields.button_text || 'View All Reviews',
    };

    // Parse reviews and sort by date (newest first)
    const reviews: TrustpilotReview[] = data.reviews.nodes
      .map((node) => {
        const fields = parseFields(node.fields);
        return {
          displayName: fields.display_name || 'Anonymous',
          experiencedAt: fields.experienced_at || '',
          stars: parseInt(fields.stars || '5', 10),
          title: fields.title || '',
          text: fields.text || '',
        };
      })
      .filter((review) => review.title && review.text)
      .sort((a, b) => {
        const dateA = new Date(a.experiencedAt).getTime();
        const dateB = new Date(b.experiencedAt).getTime();
        return dateB - dateA;
      })
      .map((review) => ({
        ...review,
        experiencedAt: formatDate(review.experiencedAt),
      }));

    return { heading, reviews };
  } catch (error) {
    console.error('Error fetching Trustpilot reviews:', error);
    // Return fallback data
    return {
      heading: {
        ratingName: 'Excellent',
        amountOfStars: '4.7',
        amountOfReviews: '3,744',
        heading: 'Over 100,000 closets sold to happy customers.',
        buttonLink: 'https://www.trustpilot.com/review/modularclosets.com',
        buttonText: 'View All Reviews',
      },
      reviews: [],
    };
  }
}
