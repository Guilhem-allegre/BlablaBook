import { Review } from "../@types/review";

/**
 * Compute rating distribution (1 to 5 stars) from a list of reviews.
 *
 * @param reviews - Array of reviews
 * @returns Array with star count, percentage, and total count per rating
 */
export const calculateRatingDistribution = (reviews: Review[]) => {
  const ratingCounts = [0, 0, 0, 0, 0];
  const ratingsOnly = reviews.filter((r) => r.rating !== null) as Required<Pick<Review, "rating">>[];

  for (const review of ratingsOnly) {
    const rating = review.rating!;
    if (rating >= 1 && rating <= 5) {
      ratingCounts[rating - 1]++;
    }
  }

  const total = ratingsOnly.length;

  return ratingCounts
    .map((count, index) => ({
      stars: index + 1,
      count,
      percentage: total === 0 ? 0 : Math.round((count / total) * 100),
    }))
    .reverse();
};
