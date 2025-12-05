import { Metadata } from 'next';
import { VistaAltoCards, WhereToStart, FAQs } from '@/components/sections';
import { getFAQs } from '@/lib/shopify';

export const metadata: Metadata = {
  title: 'Choose Your Closet System | Modular Closets',
  description:
    'Choose between Vista and Alto closet systems. Both offer stunning, custom-looking closets with a lifetime warranty at a great price!',
};

export default async function ChooseCategoryPage() {
  const faqs = await getFAQs('Choose Category Page');

  return (
    <main>
      <VistaAltoCards variant='chooseCategory' />
      <WhereToStart variant='chooseCategory' />
      <div className='bg-[#f7f5f3]'>
        <FAQs faqs={faqs} withCardPadding />
      </div>
    </main>
  );
}
