import {
  Hero,
  TrustpilotReviews,
  FAQs,
  VistaAltoCards,
  GoModular,
  FeaturedIn,
  WhereToStart,
  CustomerClosets,
  CrazyEasy,
  ProSe,
  FreeDesign,
  AssemblesEasy,
} from '@/components/sections';
import { getTrustpilotReviews } from '@/lib/shopify/trustpilot';
import { getFAQs, getCustomerClosets } from '@/lib/shopify';

export default async function Home() {
  const [{ heading, reviews }, faqs, customerClosets] = await Promise.all([
    getTrustpilotReviews(),
    getFAQs('Homepage'),
    getCustomerClosets(),
  ]);

  return (
    <>
      <Hero />

      <VistaAltoCards variant='homepage' />

      <VistaAltoCards variant='otherSpaces' />

      <GoModular />

      <FeaturedIn />

      <WhereToStart variant='chooseCategory' showHeading={false} />

      <TrustpilotReviews
        heading={heading.heading}
        ratingName={heading.ratingName}
        amountOfStars={heading.amountOfStars}
        amountOfReviews={heading.amountOfReviews}
        buttonLink={heading.buttonLink}
        buttonText={heading.buttonText}
        reviews={reviews}
      />

      <CustomerClosets closets={customerClosets} />

      <CrazyEasy reviews={reviews} />

      <ProSe />

      <FreeDesign />

      <FAQs faqs={faqs} />

      <AssemblesEasy />
    </>
  );
}
