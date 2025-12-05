'use client';

import { useState, useMemo } from 'react';
import { ProductGallery } from './ProductGallery';
import { VariantSelector } from './VariantSelector';
import { AddToCart } from './AddToCart';
import { ProductAccordion } from './ProductAccordion';
import { ProductAddOns } from './ProductAddOns';
import type { Product } from '@/types';

interface ProductDetailsProps {
  product: Product;
  initialVariantId?: string;
}

export function ProductDetails({ product, initialVariantId }: ProductDetailsProps) {
  const variants = product.variants.edges.map((edge) => edge.node);
  const images = product.images.edges.map((edge) => edge.node);

  const initialVariant = initialVariantId
    ? variants.find(
        (v) =>
          v.id === initialVariantId || v.id === `gid://shopify/ProductVariant/${initialVariantId}`,
      )
    : variants.find((v) => v.availableForSale) || variants[0];

  const [selectedOptions, setSelectedOptions] = useState<Record<string, string>>(() => {
    if (!initialVariant) return {};
    return initialVariant.selectedOptions.reduce(
      (acc, opt) => ({ ...acc, [opt.name]: opt.value }),
      {},
    );
  });

  const selectedVariant = useMemo(() => {
    return variants.find((variant) =>
      variant.selectedOptions.every((opt) => selectedOptions[opt.name] === opt.value),
    );
  }, [variants, selectedOptions]);

  const handleOptionChange = (optionName: string, value: string) => {
    setSelectedOptions((prev) => ({
      ...prev,
      [optionName]: value,
    }));
  };

  // Filter images based on selected variant's image altText
  const displayImages = useMemo(() => {
    // If no variant selected or variant has no image, show all
    if (!selectedVariant?.image) {
      return images;
    }

    const variantAltText = selectedVariant.image.altText;

    // If variant image has no altText, just put it first
    if (!variantAltText) {
      const variantImageId = selectedVariant.image.id;
      const variantImg = images.find((img) => img.id === variantImageId);
      if (variantImg) {
        const otherImages = images.filter((img) => img.id !== variantImageId);
        return [variantImg, ...otherImages];
      }
      return images;
    }

    // Find all images with matching altText (exact match, skip ab_test and swatch images)
    const matchingImages = images.filter((img) => {
      if (!img.altText) return false;
      // Skip images with "ab_test" in altText
      if (img.altText.toLowerCase().includes('ab_test')) return false;
      // Skip swatch images
      if (img.altText.toLowerCase().includes('swatch')) return false;

      return img.altText.toLowerCase() === variantAltText.toLowerCase();
    });

    // If we found matches, use them (with variant image first)
    if (matchingImages.length > 0) {
      const variantImageId = selectedVariant.image.id;
      const variantImg = matchingImages.find((img) => img.id === variantImageId);
      if (variantImg) {
        const withoutVariant = matchingImages.filter((img) => img.id !== variantImageId);
        return [variantImg, ...withoutVariant];
      }
      return matchingImages;
    }

    // Fallback: put variant image first
    const variantImageId = selectedVariant.image.id;
    const variantImg = images.find((img) => img.id === variantImageId);
    if (variantImg) {
      const otherImages = images.filter((img) => img.id !== variantImageId);
      return [variantImg, ...otherImages];
    }

    return images;
  }, [selectedVariant, images]);

  const hasMultipleOptions = product.options.length > 0 && product.options[0].values.length > 1;

  // Remove "Vista " prefix from title like the live site does
  const displayTitle = product.title.replace(/^Vista\s+/i, '');

  return (
    <div className='product-single flex flex-col md:flex-row md:justify-end md:items-start pb-8'>
      {/* Media - Left side, sticky on desktop */}
      <div className='product-single__media md:w-1/2 lg:w-[calc(100%-580px)] lg:max-w-[600px] md:sticky md:top-[120px]'>
        <ProductGallery images={displayImages} productTitle={product.title} />
      </div>

      {/* Details - Right side */}
      <div className='product-single__details md:w-1/2 lg:w-[520px] md:ml-4 lg:mx-[68px] mt-4 md:mt-0'>
        <div className='product-single__details-wrapper'>
          {/* Title */}
          <h1 className='product-single__title text-3xl md:text-4xl font-bold uppercase tracking-wide m-0 pb-1'>
            {displayTitle}
          </h1>

          {/* SKU */}
          {selectedVariant?.sku && (
            <div className='product-single__sku text-sm text-gray-500 uppercase'>
              {selectedVariant.sku}
            </div>
          )}

          {/* Product Form */}
          <div className='product-single__form mt-6'>
            {/* Swatches / Variant Selector */}
            {hasMultipleOptions && (
              <VariantSelector
                options={product.options}
                variants={variants}
                selectedOptions={selectedOptions}
                onOptionChange={handleOptionChange}
              />
            )}

            {/* Price & Add to Cart */}
            <AddToCart
              variant={selectedVariant || null}
              product={{
                id: product.id,
                title: product.title,
                handle: product.handle,
              }}
              upsellVariants={
                selectedVariant?.closetAddOns?.reference?.fields
                  ? (() => {
                      const variantsField = selectedVariant.closetAddOns.reference.fields.find(
                        (f) => f.key === 'variants',
                      );
                      return variantsField?.references?.nodes || [];
                    })()
                  : undefined
              }
            />

            {/* Accordion Sections */}
            <ProductAccordion
              description={product.descriptionHtml}
              variantSpecs={
                selectedVariant
                  ? {
                      // Section 1 - Material/Color
                      material: selectedVariant.material?.value,
                      color: selectedVariant.variantColor?.value,
                      finish: selectedVariant.finish?.value,
                      // Section 2 - Dimensions
                      height: selectedVariant.height?.value,
                      width: selectedVariant.width?.value,
                      depth: selectedVariant.depth?.value,
                      internalHeight: selectedVariant.internalHeight?.value,
                      internalWidth: selectedVariant.internalWidth?.value,
                      hangingSpace: selectedVariant.hangingSpace?.value,
                      shelfSpace: selectedVariant.shelfSpace?.value,
                      // Section 3 - Item Details
                      mountType: selectedVariant.mountType?.value,
                      numberOfRods: selectedVariant.numberOfRods?.value,
                      numberOfFixedShelves: selectedVariant.numberOfFixedShelves?.value,
                      numberOfAdjustableShelves: selectedVariant.numberOfAdjustableShelves?.value,
                      numberOfDrawers: selectedVariant.numberOfDrawers?.value,
                      totalWeightCapacity: selectedVariant.totalWeightCapacity?.value,
                      hardwareIncluded: selectedVariant.hardwareIncluded?.value,
                    }
                  : undefined
              }
              assemblyInstructions={product.assemblyInstructions?.references?.nodes
                ?.map((node) => {
                  const titleField = node.fields.find((f) => f.key === 'title');
                  const fileField = node.fields.find((f) => f.key === 'file');
                  if (titleField?.value && fileField?.reference?.url) {
                    return {
                      title: titleField.value,
                      fileUrl: fileField.reference.url,
                    };
                  }
                  return null;
                })
                .filter((item): item is { title: string; fileUrl: string } => item !== null)}
            />

            {/* Add-ons / Upsells */}
            {selectedVariant?.closetAddOns?.reference?.fields &&
              (() => {
                const variantsField = selectedVariant.closetAddOns.reference.fields.find(
                  (f) => f.key === 'variants',
                );
                const addOns = variantsField?.references?.nodes || [];
                if (addOns.length > 0) {
                  return <ProductAddOns productTitle={product.title} addOns={addOns} />;
                }
                return null;
              })()}
          </div>
        </div>
      </div>
    </div>
  );
}
