import { FAQPageContent } from './FAQPageContent';
import faqData from './faq-data.json';

export const metadata = {
  title: 'Frequently Asked Questions | Modular Closets',
  description:
    'Find answers to the most common questions about Modular Closets products, design, shipping, and installation.',
};

export default function FrequentlyAskedQuestionsPage() {
  return (
    <FAQPageContent categories={faqData.categories} sidebarCategories={faqData.sidebarCategories} />
  );
}
