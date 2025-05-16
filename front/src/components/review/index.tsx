import { useEffect, useState } from "react";
import AverageRating from "./AverageRating";
import Ratings from "./Ratings";
import { Review, ReviewApiResponse } from "../../@types/review";
import { useParams } from "react-router-dom";
import { getReviewsByBook } from "../../api/apiReview";
import ReviewModal from "./ReviewModal";
import OpenModal from "./OpenModal";
import ReviewList from "./ReviewList";

/**
 * ReviewS component that displays ratings, reviews, and review actions.
 *
 * @returns {JSX.Element} - The rendered review.
 */
const ReviewSection = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [reviewData, setReviewData] = useState<ReviewApiResponse | null>(null);
  const [loading, setLoading] = useState(true);
  const { bookId } = useParams();
  const numericBookId = Number(bookId);

  const fetchData = async () => {
    setLoading(true);
    try {
      const data = await getReviewsByBook(numericBookId);
      console.log("Nouvelles données reçues :", data);
      setReviewData(data);
    } catch (err) {
      console.error("Erreur API:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, [bookId]);

  if (loading) {
    return <p className="text-center">Chargement des avis...</p>;
  }

  if (!reviewData) {
    return <p className="text-center">Aucun avis pour ce livre.</p>;
  }

  const userRatingsMap = new Map<number, number>();
  if (reviewData.rating) {
    userRatingsMap.set(reviewData.rating.user.id, reviewData.rating.rating);
  }
  reviewData.comments.forEach((r) => {
    if (r.rating !== null) {
      userRatingsMap.set(r.user.id, r.rating);
    }
  });

  const reviewCardsData = reviewData.comments
    .sort(
      (a, b) =>
        new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
    )
    .map((r) => ({
      id: String(r.id),
      username: r.user.name,
      date: new Date(r.createdAt).toLocaleDateString("fr-FR"),
      rating: userRatingsMap.get(r.user.id), // ⭐ Note actuelle de l’auteur
      title: r.title ?? undefined,
      comment: r.comment ?? undefined,
    }));
  console.log("reviewCardsData : ", reviewCardsData);

  const allReviews: Review[] = [
    ...(reviewData.rating
      ? [
          {
            ...reviewData.rating,
            title: null,
            comment: null,
            book_id: reviewData.book_id,
          } as Review,
        ]
      : []),
    ...reviewData.comments,
  ];

  return (
    <section className="py-24 relative font-body">
      <div className="max-w-7xl mx-auto px-4">
        <h2 className="font-title text-4xl text-center mb-12 text-black">
          Les notes et avis
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <Ratings reviews={allReviews} />
          </div>

          <div className="flex items-center justify-center">
            <AverageRating
              value={reviewData.rating?.rating ?? 0}
              subtitle={`${
                reviewData.comments.length + (reviewData.rating ? 1 : 0)
              } avis`}
            />
          </div>

          <div className="flex items-center justify-center">
            <OpenModal onWriteClick={() => setIsModalOpen(true)} />
          </div>
        </div>

        {/* List of reviews */}
        <ReviewList reviews={reviewCardsData} perPage={2} />
      </div>

      {/* Modal */}
      <ReviewModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        bookId={numericBookId}
        onReviewAdded={fetchData}
      />
    </section>
  );
};

export default ReviewSection;
