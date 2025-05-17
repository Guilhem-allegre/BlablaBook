import { useEffect, useState } from "react";
import AverageRating from "./AverageRating";
import Ratings from "./Ratings";
import { ReviewApiResponse } from "../../@types/review";
import { useParams } from "react-router-dom";
import { getReviewsByBook } from "../../api/apiReview";
import ReviewModal from "./ReviewModal";
import OpenModal from "./OpenModal";
import ReviewList from "./ReviewList";
import { calculateAverageRating } from "../../utils/reviews";

/**
 * ReviewS component that displays ratings, reviews, and review actions.
 *
 * @returns {JSX.Element} - The rendered review.
 */
const ReviewSection = () => {
  // Etat de la modal. true = ouverte, false = fermé
  const [isModalOpen, setIsModalOpen] = useState(false);
  // Stock la réponse API
  const [reviewData, setReviewData] = useState<ReviewApiResponse | null>(null);
  // Loading
  const [loading, setLoading] = useState(true);
  // Récupére l'id du bouquin depuis l'url et le transforme en number
  const { bookId } = useParams();
  const numericBookId = Number(bookId);

  /**
   *
   */
  const fetchData = async () => {
    setLoading(true);
    try {
      const data = await getReviewsByBook(numericBookId);
      //console.log("Nouvelles données reçues :", data);
      setReviewData(data);
    } catch (err) {
      console.error("Erreur API:", err);
    } finally {
      setLoading(false);
    }
  };

  /**
   *
   */
  useEffect(() => {
    fetchData();
  }, [bookId]);

  if (loading) {
    return <p className="text-center">Chargement des avis...</p>;
  }

  if (!reviewData) {
    return <p className="text-center">Aucun avis pour ce livre.</p>;
  }

  // Créer une instance de Map, permet de stocker des paires de clé-valeur. (userId (de type number): rating (de type number))
  const userRatingsMap = new Map<number, number>();
  // Vérifie si la note existe, si oui -> créer l'entré userId: rating
  reviewData.reviews.forEach((r) => {
    if (r.rating !== null) {
      userRatingsMap.set(r.user.id, r.rating);
    }
  });

  // Tri les commentaires par date de création
  //console.log("Données initiales :", reviewData.comments);
  const reviewCardsData = reviewData.reviews.sort((a, b) => {
    const dateA = new Date(a.createdAt).getTime();
    const dateB = new Date(b.createdAt).getTime();
    //console.log(`Comparaison : ${dateA} - ${dateB}`);
    return dateB - dateA;
  });
  //console.log("Données triées :", reviewCardsData);
  const transformedData = reviewCardsData.map((r) => {
    const transformedItem = {
      id: String(r.id),
      username: r.user.name,
      date: new Date(r.createdAt).toLocaleDateString("fr-FR"),
      rating: userRatingsMap.get(r.user.id),
      title: r.title ?? undefined,
      comment: r.comment ?? undefined,
    };
    // console.log("Élément transformé :", transformedItem);
    return transformedItem;
  });
  //console.log("Données finales :", transformedData);

  const allReviews = reviewData.reviews;

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
              value={calculateAverageRating(allReviews)}
              subtitle={`${allReviews.length} avis`}
            />
          </div>

          <div className="flex items-center justify-center">
            <OpenModal onWriteClick={() => setIsModalOpen(true)} />
          </div>
        </div>

        {/* List of reviews */}
        <ReviewList reviews={transformedData} perPage={2} />
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
