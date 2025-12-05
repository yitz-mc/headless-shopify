import { getShopifyClient } from './client';
import { GET_CUSTOMER_CLOSETS } from '@/graphql';

export interface CustomerCloset {
  id: string;
  customerName: string;
  closetMeasurements: string;
  totalCost: string;
  turnaroundTime: string;
  youtubeUrl?: string;
  media?: {
    type: 'image' | 'video';
    url: string;
    altText?: string;
    previewImage?: string;
  };
}

interface MetaobjectField {
  key: string;
  value: string;
  reference?: {
    __typename: string;
    image?: {
      url: string;
      altText: string;
      width: number;
      height: number;
    };
    sources?: Array<{
      url: string;
      mimeType: string;
    }>;
    previewImage?: {
      url: string;
    };
  };
}

interface CustomerClosetsResponse {
  metaobjects: {
    nodes: Array<{
      id: string;
      fields: MetaobjectField[];
    }>;
  };
}

export async function getCustomerClosets(): Promise<CustomerCloset[]> {
  const client = getShopifyClient();
  const data = await client.request<CustomerClosetsResponse>(GET_CUSTOMER_CLOSETS);

  const closets = data.metaobjects.nodes.map((node) => {
    const fields = node.fields.reduce(
      (acc, field) => {
        acc[field.key] = field;
        return acc;
      },
      {} as Record<string, MetaobjectField>,
    );

    let media: CustomerCloset['media'] = undefined;

    if (fields.media?.reference) {
      const ref = fields.media.reference;
      if (ref.__typename === 'MediaImage' && ref.image) {
        media = {
          type: 'image',
          url: ref.image.url,
          altText: ref.image.altText || '',
        };
      } else if (ref.__typename === 'Video' && ref.sources?.[0]) {
        media = {
          type: 'video',
          url: ref.sources[0].url,
          previewImage: ref.previewImage?.url,
        };
      }
    }

    return {
      id: node.id,
      customerName: fields.customer_name?.value || '',
      closetMeasurements: fields.closet_measurements?.value || '',
      totalCost: fields.total_cost?.value || '',
      turnaroundTime: fields.turnaround_time?.value || '',
      youtubeUrl: fields.youtube_url?.value || undefined,
      media,
    };
  });

  // Sort by customer name ascending
  return closets.sort((a, b) => a.customerName.localeCompare(b.customerName));
}
