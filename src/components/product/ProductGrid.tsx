import { ProductCard } from './ProductCard';
import type { ProductCard as ProductCardType } from '@/types';

interface ProductGridProps {
  products: ProductCardType[];
  collectionHandle?: string;
}

export function ProductGrid({ products, collectionHandle }: ProductGridProps) {
  if (products.length === 0) {
    return (
      <div className='py-12 text-center'>
        <p className='text-gray-500'>No products found in this collection.</p>
      </div>
    );
  }

  return (
    <div className='product-grid grid grid-cols-2 gap-4 md:gap-6 lg:grid-cols-3'>
      {products.map((product) => (
        <div key={product.id} className='product-grid__item'>
          <ProductCard product={product} collectionHandle={collectionHandle} />
        </div>
      ))}
    </div>
  );
}
