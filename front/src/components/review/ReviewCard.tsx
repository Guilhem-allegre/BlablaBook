interface IReviewCardProps {
  username: string;
  date: string;
  rating: number;
  review: string;
};

/**
 * ReviewCard component that displays a single review with rating, username, date, and content.
 *
 * @param {Object} param0 - Component props.
 * @param {string} param0.username - The username of the reviewer.
 * @param {string} param0.date - The date of the review.
 * @param {number} param0.rating - The rating given in the review (0-5).
 * @param {string} param0.review - The text content of the review.
 * @returns {JSX.Element} - The rendered review card component.
 */
const ReviewCard = ({
  username,
  date,
  rating,
  review,
}: IReviewCardProps) => {
  const fullStars = Math.round(rating);

  return (
    <div className="w-full border-b border-gray-200 pb-6 last:border-none">
      {/* Stars + user */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-4 gap-4">
        <div className="flex items-center gap-2">
          {Array.from({ length: 5 }).map((_, i) => (
            <svg
              key={i}
              xmlns="http://www.w3.org/2000/svg"
              width="30"
              height="30"
              viewBox="0 0 30 30"
              fill={i < fullStars ? '#FBBF24' : '#E5E7EB'}
            >
              <path d="M14.1 2.57c.37-.74 1.43-.74 1.8 0l3.28 6.64c.15.3.43.5.76.55l7.33 1.07c.82.12 1.15 1.13.52 1.7l-5.3 5.17a.94.94 0 00-.27.84l1.25 7.3c.14.82-.69 1.45-1.42 1.07l-6.56-3.45a.95.95 0 00-.9 0l-6.56 3.45c-.73.38-1.56-.25-1.42-1.07l1.25-7.3a.94.94 0 00-.27-.84L2.19 12.53c-.63-.58-.3-1.59.52-1.7l7.33-1.07c.33-.05.61-.25.76-.55L14.1 2.57z" />
            </svg>
          ))}
        </div>

        <div className="flex items-center gap-2">
          <p className="font-semibold text-lg text-black">@{username}</p>
          <p className="text-gray-400 text-base">{date}</p>
        </div>
      </div>

      {/* Text of the notice */}
      <p className="text-lg text-gray-600 leading-8">{review}</p>
    </div>
  );
};

export default ReviewCard;