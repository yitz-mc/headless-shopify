/**
 * FAQ content types
 */

export interface FAQItem {
  question: string;
  answer: string;
}

export interface FAQCategory {
  id: string;
  heading: string;
  items: FAQItem[];
}
