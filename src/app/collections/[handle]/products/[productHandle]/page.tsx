import { Metadata } from "next";
import { notFound, redirect } from "next/navigation";
import { getShopifyClient } from "@/lib/shopify";
import { GET_PRODUCT_BY_HANDLE } from "@/graphql";
import { ProductDetails, ProductTrustpilot, ProductInUseGallery } from "@/components/product";
import { WhereToStart } from "@/components/sections";
import { Breadcrumb } from "@/components/ui";
import type { Product } from "@/types";

interface ProductPageProps {
  params: Promise<{
    handle: string;
    productHandle: string;
  }>;
  searchParams: Promise<{
    variant?: string;
  }>;
}

interface ProductResult {
  product: Product | null;
  error: string | null;
}

async function getProduct(handle: string): Promise<ProductResult> {
  const client = getShopifyClient();

  try {
    const data = await client.request<{ product: Product | null }>(GET_PRODUCT_BY_HANDLE, {
      handle,
    });

    return { product: data.product, error: null };
  } catch (error) {
    console.error("Error fetching product:", error);
    return { product: null, error: "Failed to load product" };
  }
}

export async function generateMetadata({ params }: ProductPageProps): Promise<Metadata> {
  const { productHandle } = await params;
  const { product } = await getProduct(productHandle);

  if (!product) {
    return { title: "Product Not Found" };
  }

  return {
    title: `${product.title} | Modular Closets`,
    description: product.description || `Shop ${product.title}`,
  };
}

export default async function CollectionProductPage({ params, searchParams }: ProductPageProps) {
  const { handle: collectionHandle, productHandle } = await params;
  const { variant: variantId } = await searchParams;
  const { product, error } = await getProduct(productHandle);

  if (!error && !product) {
    notFound();
  }

  // Handle product redirects (for discontinued/replaced products)
  if (product?.redirect?.value) {
    redirect(product.redirect.value);
  }

  if (error || !product) {
    return (
      <div className="container mx-auto px-4 py-16 text-center">
        <h1 className="text-2xl font-bold mb-4">Product</h1>
        <p className="text-gray-500">Unable to load product. Please try again later.</p>
      </div>
    );
  }

  const variantSkus = product.variants.edges
    .map((edge) => edge.node.sku)
    .filter((sku): sku is string => Boolean(sku));

  return (
    <div className="product-page py-8">
      <div className="container mx-auto px-4">
        <Breadcrumb
          items={[
            { label: "Home", href: "/", showHomeIcon: true },
            { label: "All Modules", href: `/collections/${collectionHandle}` },
            { label: product.title },
          ]}
        />

        <ProductDetails product={product} initialVariantId={variantId} />
      </div>

      <ProductTrustpilot
        productTitle={product.title}
        productId={product.id}
        variantSkus={variantSkus}
      />
      <ProductInUseGallery productId={product.id} />

      <WhereToStart />
    </div>
  );
}
