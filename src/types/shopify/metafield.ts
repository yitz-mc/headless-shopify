/**
 * Shopify Metafield types
 */

export interface Metafield {
  value: string;
}

export interface MetaobjectField {
  key: string;
  value: string | null;
  reference?: {
    url?: string;
  } | null;
}

export interface MetaobjectNode {
  fields: MetaobjectField[];
}

export interface MetaobjectConnection {
  nodes: MetaobjectNode[];
}

export interface AssemblyInstructionsMetafield {
  references?: {
    nodes: MetaobjectNode[];
  } | null;
}

export interface AssemblyInstruction {
  title: string;
  fileUrl: string;
}
