'use client';

import { useState, useEffect, useRef } from 'react';

export interface TrustpilotReview {
  displayName: string;
  experiencedAt: string;
  title: string;
  text: string;
  stars: number;
}

export interface TrustpilotReviewsProps {
  heading: string; ratingName: string; amountOfStars: string; amountOfReviews: string; buttonLink: string; buttonText: string;
  
  
  
  
  reviews: TrustpilotReview[];
}



const TrustpilotLogo = () => (
  <img
    src="https://cdn.trustpilot.net/brand-assets/4.1.0/logo-black.svg"
    alt="Trustpilot"
    width={114}
    height={28}
  />
);

const TrustpilotStar = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
    <rect width="24" height="24" fill="#00b67a" />
    <path
      d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z"
      fill="white"
    />
  </svg>
);

const ArrowLeft = () => (
  <svg width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
    <g clipPath="url(#clip0_176_12)">
      <path
        d="M30.4912 20.0037L10.1749 20.0037M18.5241 28.6734L9.52554 20.0037L18.5241 11.3425M0.843262 20.0036C0.843261 9.42139 9.42187 0.842774 20.0041 0.842773C30.5864 0.842773 39.165 9.42138 39.165 20.0036C39.165 30.5859 30.5864 39.1645 20.0041 39.1645C9.42188 39.1645 0.843263 30.5859 0.843262 20.0036Z"
        stroke="#21201F"
        strokeMiterlimit="10"
        strokeLinecap="round"
      />
    </g>
  </svg>
);

const ArrowRight = () => (
  <svg width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
    <g clipPath="url(#clip0_176_14)">
      <path
        d="M9.52131 20.0041L29.8376 20.0041M21.4884 11.3345L30.4869 20.0041L21.4884 28.6653M39.165 20.0041C39.165 30.5864 30.5864 39.165 20.0041 39.165C9.42187 39.165 0.84326 30.5864 0.843262 20.0041C0.843264 9.42187 9.42188 0.84326 20.0041 0.843262C30.5864 0.843264 39.165 9.42188 39.165 20.0041Z"
        stroke="#21201F"
        strokeMiterlimit="10"
        strokeLinecap="round"
      />
    </g>
  </svg>
);

export function TrustpilotReviews({
  heading,
  ratingName,
  amountOfStars,
  amountOfReviews,
  buttonLink,
  buttonText, reviews,
}: TrustpilotReviewsProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [cardsPerView, setCardsPerView] = useState(3);
  const sliderRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const updateCardsPerView = () => {
      if (window.innerWidth > 1024) {
        setCardsPerView(3);
      } else if (window.innerWidth > 767) {
        setCardsPerView(2);
      } else {
        setCardsPerView(1);
      }
    };

    updateCardsPerView();
    window.addEventListener("resize", updateCardsPerView);

  return () => window.removeEventListener('resize', updateCardsPerView);
  }, []);

  const maxIndex = Math.max(0, reviews.length - cardsPerView);

  const handlePrev = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
    }
  };

  const handleNext = () => {
    if (currentIndex < maxIndex) {
      setCurrentIndex(currentIndex + 1);
    }
  };

  if (reviews.length === 0) {
    return null;
  }

  return (
    <section className="py-[60px]">
      <div className="container mx-auto px-4">
        <div className="flex flex-col lg:flex-row gap-[30px] lg:gap-[40px] items-start">
          {/* Left side - Info */}
          <div className="lg:flex-shrink-0 lg:w-[275px] w-full lg:text-left text-center">
            <div className="mb-5">
              <TrustpilotLogo />
            </div>
            <div className="flex flex-col-reverse lg:flex-col">
              <p className="text-base text-gray-700 mb-5 lg:mb-5">
                Rated {ratingName}, {amountOfStars} Stars by {amountOfReviews} reviewers&nbsp;out of 5
                stars
              </p>
              <h2 className="text-2xl lg:text-[32px] font-bold leading-tight mb-5 text-gray-900">
                {heading}
              </h2>
            </div>
            <a
              href={buttonLink}
              target="_blank"
              rel="noopener noreferrer"
              className="hidden lg:inline-block px-5 py-2 bg-[#E07B67] text-white rounded-full hover:bg-[#d06a56] transition-colors text-center whitespace-nowrap"
            >
              {buttonText}
            </a>
          </div>

          {/* Right side - Slider */}
          <div className="flex-1 relative pb-[60px] min-w-0">
            <div className="overflow-hidden">
              <div
                ref={sliderRef}
                className="flex gap-6 transition-transform duration-300 ease-out"
                style={{
                  transform: `translateX(calc(-${currentIndex} * (${100 / cardsPerView}% + ${24 / cardsPerView}px)))`,
                }}
              >
                {reviews.map((review, index) => (
                  <div
                    key={index}
                    className="flex-shrink-0 bg-white p-6 rounded-lg border border-gray-200"
                    style={{
                      width: `calc(${100 / cardsPerView}% - ${(24 * (cardsPerView - 1)) / cardsPerView}px)`,
                    }}
                  >
                    <div className="flex justify-between mb-3">
                      <span className="font-semibold text-gray-900">{review.displayName}</span>
                      <span className="text-gray-500 text-sm">{review.experiencedAt}</span>
                    </div>
                    <div className="flex gap-0.5 mb-3">
                      {Array.from({ length: review.stars }).map((_, i) => (
                        <TrustpilotStar key={i} />
                      ))}
                    </div>
                    <h3 className="text-lg font-semibold mb-3 text-gray-900">{review.title}</h3>
                    <p className="text-base leading-relaxed text-gray-500">{review.text}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Navigation arrows */}
            <button
              onClick={handlePrev}
              disabled={currentIndex === 0}
              className={`absolute bottom-0 right-[50px] w-10 h-10 flex items-center justify-center transition-all ${
                currentIndex === 0 ? 'opacity-50 cursor-default' : 'cursor-pointer hover:opacity-70'
              }`}
              aria-label="Previous review"
            >
              <ArrowLeft />
            </button>
            <button
              onClick={handleNext}
              disabled={currentIndex >= maxIndex}
              className={`absolute bottom-0 right-0 w-10 h-10 flex items-center justify-center transition-all ${
                currentIndex >= maxIndex
                  ? 'opacity-50 cursor-default'
                  : 'cursor-pointer hover:opacity-70'
              }`}
              aria-label="Next review"
            >
              <ArrowRight />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
