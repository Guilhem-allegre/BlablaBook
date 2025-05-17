import { useState } from "react";
import ReactDOM from "react-dom";
import { postReview } from "../../api/apiReview";
import { NewReviewPayload } from "../../@types/review";

interface IReviewModalProps {
  isOpen: boolean;
  onClose: () => void;
  bookId: number;
  onReviewAdded: () => void; // Pour recharger les avis
}

/**
 * ReviewModal component that displays a modal for submitting a new review.
 */
const ReviewModal = ({ isOpen, onClose, bookId, onReviewAdded }: IReviewModalProps) => {
  const [title, setTitle] = useState("");
  const [comment, setComment] = useState("");
  const [rating, setRating] = useState<number | null>(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const payload: NewReviewPayload = {
        title: title || undefined,
        comment: comment || undefined,
        rating: rating ?? undefined,
      };

      await postReview(bookId, payload);
      console.log("Avis ajouté !")
      onClose();
      onReviewAdded();
      setTitle("");
      setComment("");
      setRating(null);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  if (!isOpen) return null;

  return ReactDOM.createPortal(
    <div className="fixed font-body inset-0 z-50 flex items-center justify-center bg-black/50">
      <div className="bg-white rounded-lg p-6 w-full max-w-xl relative shadow-lg">
        <button
          className="absolute top-3 right-3 text-gray-500 hover:text-gray-800 text-xl"
          onClick={onClose}
        >
          &times;
        </button>

        <h2 className="text-2xl font-bold mb-4 text-black">Laissez votre avis</h2>

        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          {/* Simplified rating selector */}
          <div className="flex gap-1">
            {[1, 2, 3, 4, 5].map((star) => (
              <button
                type="button"
                key={star}
                className={`text-2xl ${rating && rating >= star ? "text-yellow-400" : "text-gray-300"}`}
                onClick={() => setRating(star)}
              >
                ★
              </button>
            ))}
          </div>

          <input
            type="text"
            placeholder="Titre"
            className="px-4 py-2 border rounded-lg"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
          <textarea
            placeholder="Votre commentaire..."
            className="px-4 py-2 border rounded-lg h-32"
            value={comment}
            onChange={(e) => setComment(e.target.value)}
          />

          {error && <p className="text-red-500 text-sm">{error}</p>}

          <button
            type="submit"
            disabled={loading}
            className="rounded px-6 py-3 bg-gray-800 text-white font-semibold hover:bg-gray-600"
          >
            {loading ? "Envoi en cours..." : "Postez votre avis"}
          </button>
        </form>
      </div>
    </div>,
    document.body
  );
};

export default ReviewModal;
