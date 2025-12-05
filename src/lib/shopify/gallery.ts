import { getShopifyClient } from './client';
import { GET_GALLERY_IMAGES } from '@/graphql';

export interface GalleryImage {
  id: string;
  small: string;
  full: string;
  altText: string;
  width: number;
  height: number;
  tags: string[];
}

interface MediaImageReference {
  __typename: 'MediaImage';
  image: {
    small: string;
    full: string;
    altText: string | null;
    width: number;
    height: number;
  };
}

interface GalleryField {
  key: string;
  value: string | null;
  reference: MediaImageReference | null;
}

interface GalleryEdge {
  cursor: string;
  node: {
    id: string;
    fields: GalleryField[];
  };
}

interface GalleryResponse {
  metaobjects: {
    edges: GalleryEdge[];
    pageInfo: {
      hasNextPage: boolean;
    };
  };
}

function parseTags(raw: string | null): string[] {
  if (!raw) return [];
  return raw
    .split(/[,|\n]/)
    .map((t) => t.trim().toLowerCase())
    .filter(Boolean);
}

async function fetchGalleryPage(
  client: ReturnType<typeof getShopifyClient>,
  cursor: string | null,
): Promise<GalleryResponse> {
  const PAGE_SIZE = 200;
  const MO_TYPE = 'gallery';

  return client.request<GalleryResponse>(GET_GALLERY_IMAGES, {
    type: MO_TYPE,
    first: PAGE_SIZE,
    after: cursor,
  });
}

export async function getGalleryImages(): Promise<{
  images: GalleryImage[];
  tags: string[];
}> {
  const client = getShopifyClient();
  const allImages: GalleryImage[] = [];
  const tagSet = new Set<string>();

  let hasNextPage = true;
  let cursor: string | null = null;

  while (hasNextPage) {
    const data = await fetchGalleryPage(client, cursor);

    const edges = data.metaobjects.edges;
    hasNextPage = data.metaobjects.pageInfo.hasNextPage;
    cursor = edges.length > 0 ? edges[edges.length - 1].cursor : null;

    for (const edge of edges) {
      const fields: Record<string, GalleryField> = {};
      edge.node.fields.forEach((f) => {
        fields[f.key] = f;
      });

      const media = fields.image?.reference?.image;
      if (!media?.small || !media?.full) continue;

      const tags = parseTags(fields.tag?.value || null);
      tags.forEach((t) => tagSet.add(t));

      allImages.push({
        id: edge.node.id,
        small: media.small,
        full: media.full,
        altText: media.altText || '',
        width: media.width,
        height: media.height,
        tags,
      });
    }
  }

  // Sort tags: "bedroom" first, then alphabetical, then "other" last
  const sortedTags = Array.from(tagSet).sort((a, b) => {
    if (a === 'bedroom') return -1;
    if (b === 'bedroom') return 1;
    if (a === 'other') return 1;
    if (b === 'other') return -1;
    return a.localeCompare(b);
  });

  return {
    images: allImages,
    tags: sortedTags,
  };
}
