import { gql } from 'graphql-request';

export const PRODUCT_FRAGMENT = gql`
  fragment ProductFragment on Product {
    id
    title
    handle
    description
    descriptionHtml
    availableForSale
    productType
    vendor
    tags
    options {
      id
      name
      values
    }
    priceRange {
      minVariantPrice {
        amount
        currencyCode
      }
      maxVariantPrice {
        amount
        currencyCode
      }
    }
    compareAtPriceRange {
      minVariantPrice {
        amount
        currencyCode
      }
      maxVariantPrice {
        amount
        currencyCode
      }
    }
    specifications: metafield(namespace: "custom", key: "specifications") {
      value
    }
    redirect: metafield(namespace: "custom", key: "redirect") {
      value
    }
    assemblyInstructions: metafield(namespace: "custom", key: "assembly_instructions") {
      references(first: 10) {
        nodes {
          ... on Metaobject {
            fields {
              key
              value
              reference {
                ... on GenericFile {
                  url
                }
              }
            }
          }
        }
      }
    }
    images(first: 50) {
      edges {
        node {
          id
          url
          altText
          width
          height
        }
      }
    }
    variants(first: 100) {
      edges {
        node {
          id
          title
          availableForSale
          quantityAvailable
          sku
          selectedOptions {
            name
            value
          }
          price {
            amount
            currencyCode
          }
          compareAtPrice {
            amount
            currencyCode
          }
          image {
            id
            url
            altText
            width
            height
          }
          # Section 1 - Material/Color
          material: metafield(namespace: "my_fields", key: "material") {
            value
          }
          variantColor: metafield(namespace: "my_fields", key: "color") {
            value
          }
          finish: metafield(namespace: "my_fields", key: "finish") {
            value
          }
          # Section 2 - Dimensions
          height: metafield(namespace: "my_fields", key: "height") {
            value
          }
          width: metafield(namespace: "my_fields", key: "width") {
            value
          }
          depth: metafield(namespace: "my_fields", key: "depth") {
            value
          }
          internalHeight: metafield(namespace: "my_fields", key: "internal_height") {
            value
          }
          internalWidth: metafield(namespace: "my_fields", key: "internal_width") {
            value
          }
          hangingSpace: metafield(namespace: "my_fields", key: "hanging_space") {
            value
          }
          shelfSpace: metafield(namespace: "my_fields", key: "shelf_space") {
            value
          }
          # Section 3 - Item Details
          mountType: metafield(namespace: "my_fields", key: "mount_type") {
            value
          }
          numberOfRods: metafield(namespace: "my_fields", key: "number_of_rods") {
            value
          }
          numberOfFixedShelves: metafield(namespace: "my_fields", key: "number_of_fixed_shelves") {
            value
          }
          numberOfAdjustableShelves: metafield(namespace: "my_fields", key: "number_of_adjustable_shelves") {
            value
          }
          numberOfDrawers: metafield(namespace: "my_fields", key: "number_of_drawers") {
            value
          }
          totalWeightCapacity: metafield(namespace: "my_fields", key: "total_weight_capacity_lbs_") {
            value
          }
          hardwareIncluded: metafield(namespace: "my_fields", key: "hardware_included") {
            value
          }
          # Add-ons / Upsells
          closetAddOns: metafield(namespace: "custom", key: "closet_add_ons_v4") {
            reference {
              ... on Metaobject {
                fields {
                  key
                  value
                  references(first: 10) {
                    nodes {
                      ... on ProductVariant {
                        id
                        title
                        availableForSale
                        price {
                          amount
                          currencyCode
                        }
                        image {
                          url
                          altText
                        }
                        product {
                          id
                          title
                          handle
                          description
                        }
                      }
                    }
                  }
                }
              }
            }
          }
        }
      }
    }
  }
`;

export const PRODUCT_CARD_FRAGMENT = gql`
  fragment ProductCardFragment on Product {
    id
    title
    handle
    availableForSale
    priceRange {
      minVariantPrice {
        amount
        currencyCode
      }
    }
    compareAtPriceRange {
      minVariantPrice {
        amount
        currencyCode
      }
    }
    images(first: 2) {
      edges {
        node {
          id
          url
          altText
          width
          height
        }
      }
    }
  }
`;
