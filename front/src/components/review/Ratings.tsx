import RatingBar from './RatingBar';

// Example of static data for now
const ratings = [
  { stars: 5, percentage: 30, count: 30 },
  { stars: 4, percentage: 40, count: 40 },
  { stars: 3, percentage: 20, count: 20 },
  { stars: 2, percentage: 16, count: 16 },
  { stars: 1, percentage: 8, count: 8 },
];

/**
 * RatingDistribution component that displays a distribution of ratings.
 *
 * @returns {JSX.Element} - The rendered rating distribution component.
 */
const RatingDistribution = () => {
  return (
    <div className="flex flex-col gap-4">
      {ratings.map((rating) => (
        <RatingBar
          key={rating.stars}
          stars={rating.stars}
          percentage={rating.percentage}
          count={rating.count}
        />
      ))}
    </div>
  );
};

export default RatingDistribution;