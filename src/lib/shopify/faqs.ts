import { getShopifyClient } from './client';
import { GET_FAQS } from '@/graphql';

export interface FAQItem {
  id: string;
  question: string;
  answer: string;
  categories: string[];
}

interface FAQsResponse {
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

interface RichTextNode {
  type: string;
  value?: string;
  url?: string;
  title?: string | null;
  target?: string | null;
  children?: RichTextNode[];
  listType?: string;
  level?: number;
  bold?: boolean;
  italic?: boolean;
}

function parseRichText(json: string): string {
  try {
    const data = JSON.parse(json) as RichTextNode;
    return renderNode(data);
  } catch {
    return json;
  }
}

function renderNode(node: RichTextNode): string {
  if (!node) return '';

  switch (node.type) {
    case 'root':
      return node.children?.map(renderNode).join('') || '';

    case 'paragraph':
      return `<p>${node.children?.map(renderNode).join('') || ''}</p>`;

    case 'text':
      let text = node.value || '';
      if (node.bold) text = `<strong>${text}</strong>`;
      if (node.italic) text = `<em>${text}</em>`;
      return text;

    case 'link':
      const target = node.target ? ` target="${node.target}"` : '';
      const title = node.title ? ` title="${node.title}"` : '';
      return `<a href="${node.url}"${target}${title}>${
        node.children?.map(renderNode).join('') || ''
      }</a>`;

    case 'list':
      const tag = node.listType === 'ordered' ? 'ol' : 'ul';
      return `<${tag}>${node.children?.map(renderNode).join('') || ''}</${tag}>`;

    case 'list-item':
      return `<li>${node.children?.map(renderNode).join('') || ''}</li>`;

    case 'heading':
      const level = node.level || 2;
      return `<h${level}>${node.children?.map(renderNode).join('') || ''}</h${level}>`;

    default:
      return node.children?.map(renderNode).join('') || '';
  }
}

export async function getFAQs(category?: string): Promise<FAQItem[]> {
  const client = getShopifyClient();
  const data = await client.request<FAQsResponse>(GET_FAQS);

  const faqs = data.metaobjects.nodes.map((node) => {
    const fields = node.fields.reduce(
      (acc, field) => {
        acc[field.key] = field.value;
        return acc;
      },
      {} as Record<string, string>,
    );

    // Parse categories from JSON array
    let categories: string[] = [];
    if (fields.category) {
      try {
        categories = JSON.parse(fields.category);
      } catch {
        categories = [];
      }
    }

    return {
      id: node.id,
      question: fields.question || '',
      answer: parseRichText(fields.answer_rich_text || ''),
      categories,
    };
  });

  // Filter by category if specified
  const filtered = category ? faqs.filter((faq) => faq.categories.includes(category)) : faqs;
  const sorted = filtered.slice().sort((a, b) => a.question.localeCompare(b.question));

  // Sort by order
  return sorted;
}
