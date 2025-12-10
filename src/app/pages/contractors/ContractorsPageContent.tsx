'use client';

import {
  ProHero,
  ProForm,
  AsSeenOn,
  GoModular,
  ModularAdvantage,
  TrustpilotReviews,
  ContractorProgram,
  JoinModularPro,
} from '@/components/sections';
import trustpilotContent from '@/content/trustpilot-pro.json';
import goModularProContent from '@/content/go-modular-pro.json';

export function ContractorsPageContent() {
  return (
    <main>
      {/* Hero and Form wrapper - form overlays hero on desktop */}
      <div className="relative">
        <ProHero />
        <ProForm />
      </div>

      <AsSeenOn />

      <GoModular
        heading={goModularProContent.heading}
        headingMobile={goModularProContent.headingMobile}
        videoUrl={goModularProContent.videoUrl}
        cards={goModularProContent.cards}
        showColors={false}
      />

      <ModularAdvantage />

      <TrustpilotReviews
        heading={trustpilotContent.heading}
        ratingName={trustpilotContent.ratingName}
        amountOfStars={trustpilotContent.amountOfStars}
        amountOfReviews={trustpilotContent.amountOfReviews}
        buttonLink={trustpilotContent.buttonLink}
        buttonText={trustpilotContent.buttonText}
        reviews={trustpilotContent.reviews}
      />

      <ContractorProgram />

      <JoinModularPro />
    </main>
  );
}
