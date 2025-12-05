import { gql } from 'graphql-request';

export const GET_FAQS = gql`
  query GetFAQs {
    metaobjects(type: "frequently_asked_questions", first: 50) {
      nodes {
        id
        fields {
          key
          value
        }
      }
    }
  }
`;
