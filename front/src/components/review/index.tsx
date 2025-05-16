import { useEffect, useState } from "react";
import AverageRating from "./AverageRating";
import Ratings from "./Ratings";
import { ReviewApiResponse } from "../../@types/review";
import { useParams } from "react-router-dom";
import { getReviewsByBook } from "../../api/apiReview";
import ReviewModal from "./ReviewModal";

/**
 * ReviewS component that displays ratings, reviews, and review actions.
 *
 * @returns {JSX.Element} - The rendered review.
 */
const Review = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [reviewData, setReviewData] = useState<ReviewApiResponse | null>(null);
  const [loading, setLoading] = useState(true);
  const { bookId } = useParams();
  const numericBookId = Number(bookId);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getReviewsByBook(numericBookId);
        setReviewData(data);
      } catch (err) {
        console.error("Erreur API:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [bookId]);

  if (loading) {
    return <p className="text-center">Chargement des avis...</p>;
  }

  if (!reviewData) {
    return <p className="text-center">Aucun avis pour ce livre.</p>;
  }

  return (
    <section className="py-24 relative font-body">
      <div className="max-w-7xl mx-auto px-4">
        <h2 className="font-title text-4xl text-center mb-12 text-black">
          Les notes et avis
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <Ratings reviews={reviewData.comments} />
          </div>

          <div className="flex items-center justify-center">
            <AverageRating
              value={reviewData.rating?.rating ?? 0}
              subtitle={`${reviewData.comments.length} avis`}
            />
          </div>

          <div className="flex items-center justify-center">
            {/* Formulaire plus tard */}
          </div>
        </div>

        <div className="mt-12">
          {reviewData.comments.map((comment) => (
            <div key={comment.id} className="border-b pb-4 mb-4">
              <p className="font-semibold">{comment.user.name}</p>
              {comment.title && (
                <h4 className="font-bold text-lg">{comment.title}</h4>
              )}
              {comment.comment && (
                <p className="text-gray-700">{comment.comment}</p>
              )}
              <p className="text-sm text-gray-400">
                {new Date(comment.createdAt).toLocaleDateString()}
              </p>
            </div>
          ))}
        </div>
      </div>
      {/* Modal */}
      <ReviewModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </section>
  );
};

export default Review;
