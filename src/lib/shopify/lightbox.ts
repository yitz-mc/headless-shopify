import { getShopifyClient } from './client';
import { GET_LIGHTBOX_COMPARISON } from '@/graphql';

export interface LightboxFeature {
  feature: string;
  vista: string;
  alto: string;
  order: number;
}

export interface LightboxData {
  features: LightboxFeature[];
}

interface LightboxResponse {
  metaobjects: {
    nodes: Array<{
      id: string;
      fields: Array<{
        key: string;
        value: string;
      }>;
    }>;
  };
}

export async function getLightboxComparison(): Promise<LightboxData> {
  const client = getShopifyClient();
  const data = await client.request<LightboxResponse>(GET_LIGHTBOX_COMPARISON);

  const features = data.metaobjects.nodes.map((node) => {
    const fields = node.fields.reduce(
      (acc, field) => {
        acc[field.key] = field.value;
        return acc;
      },
      {} as Record<string, string>,
    );

    return {
      feature: fields.feature_title || '',
      vista: fields.vista_system_description || '',
      alto: fields.alto_system_description || '',
      order: parseInt(fields.order || '0', 10),
    };
  });

  // Sort by order
  features.sort((a, b) => a.order - b.order);

  return { features };
}
