import AverageRating from "./AverageRating";
import Ratings from "./Ratings";

/**
 * ReviewSection component that displays ratings, reviews, and review actions.
 *
 * @returns {JSX.Element} - The rendered review section.
 */
const ReviewSection = () => {

  return (
    <section className="py-24 relative font-body">
      <div className="max-w-7xl mx-auto px-4">
        <h2 className="font-title text-4xl text-center mb-12 text-black">
          Les notes et avis
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <Ratings />
          </div>

          <div className="flex items-center justify-center">
            <AverageRating value={4.3} subtitle="46 Ratings" />
          </div>

          <div className="flex items-center justify-center">

          </div>
        </div>
      </div>
    </section>
  );
};

export default ReviewSection;