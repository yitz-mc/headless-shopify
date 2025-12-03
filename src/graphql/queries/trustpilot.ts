import { gql } from 'graphql-request';

export const GET_TRUSTPILOT_REVIEWS = gql`
  query GetTrustpilotReviews {
    heading: metaobject(handle: { handle: "excellent", type: "trustpilot_reviews_heading" }) {
      fields {
        key
        value
      }
    }
    reviews: metaobjects(type: "trustpilot_reviews", first: 50) {
      nodes {
        fields {
          key
          value
        }
      }
    }
  }
`;
