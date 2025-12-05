/**
 * Trustpilot content types
 */

export interface TrustpilotHeading {
  ratingName: string;
  amountOfStars: string;
  amountOfReviews: string;
  heading: string;
  buttonLink: string;
  buttonText: string;
}

export interface TrustpilotReview {
  displayName: string;
  experiencedAt: string;
  stars: number;
  title: string;
  text: string;
}
