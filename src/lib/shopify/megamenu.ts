import { shopifyClient } from './client';
import { GET_MEGAMENU } from '@/graphql';

export interface MegamenuItem {
  id: string;
  handle: string;
  menuType: string;
  title: string;
  url: string;
  backgroundColor: string;
  buttonColor: string;
  buttonTextColor: string;
  buttonText: string;
  image: string | null;
  sticker: string | null;
  listItems: string[];
}

interface MegamenuResponse {
  metaobjects: {
    nodes: {
      id: string;
      handle: string;
      fields: {
        key: string;
        value: string | null;
        reference?: {
          image?: {
            url: string;
            altText: string | null;
            width: number;
            height: number;
          };
        };
      }[];
    }[];
  };
}

function getFieldValue(
  fields: MegamenuResponse['metaobjects']['nodes'][0]['fields'],
  key: string,
): string {
  const field = fields.find((f) => f.key === key);
  return field?.value || '';
}

function getFieldImage(
  fields: MegamenuResponse['metaobjects']['nodes'][0]['fields'],
  key: string,
): string | null {
  const field = fields.find((f) => f.key === key);
  return field?.reference?.image?.url || null;
}

function parseListItems(value: string): string[] {
  if (!value) return [];
  try {
    const parsed = JSON.parse(value);
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}

function makeRelativeUrl(url: string): string {
  if (!url) return '/';
  // Strip modularclosets.com domain to make URLs relative
  return url.replace(/^https?:\/\/(www\.)?modularclosets\.com/i, '') || '/';
}

export async function getMegamenuItems(): Promise<MegamenuItem[]> {
  try {
    const data = await shopifyClient.request<MegamenuResponse>(GET_MEGAMENU);

    return data.metaobjects.nodes.map((node) => ({
      id: node.id,
      handle: node.handle,
      menuType: getFieldValue(node.fields, 'menu_type'),
      title: getFieldValue(node.fields, 'title'),
      url: makeRelativeUrl(getFieldValue(node.fields, 'url')),
      backgroundColor: getFieldValue(node.fields, 'background_color'),
      buttonColor: getFieldValue(node.fields, 'button_color'),
      buttonTextColor: getFieldValue(node.fields, 'button_text_color'),
      buttonText: getFieldValue(node.fields, 'button_text'),
      image: getFieldImage(node.fields, 'image'),
      sticker: getFieldImage(node.fields, 'sticker'),
      listItems: parseListItems(getFieldValue(node.fields, 'list_items')),
    }));
  } catch (error) {
    console.error('Error fetching megamenu:', error);
    return [];
  }
}
