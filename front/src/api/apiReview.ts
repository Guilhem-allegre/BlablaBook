import { ReviewApiResponse,NewReviewPayload } from "../@types/review";
import { authFetch } from "../utils/authFetch";
import { IError } from "../@types/auth";
const API_URL = import.meta.env.VITE_API_BASE_URL;

/**
 * 
 * @param bookId 
 * @returns 
 */
export const getReviewsByBook = async (bookId: number): Promise<ReviewApiResponse> => {
  const res = await authFetch(`${API_URL}/books/${bookId}/reviews`);
  if (!res.ok) {
    throw new Error("Erreur lors du chargement des avis");
  }
  return res.json();
};

/**
 * Post a new review or rating for a book.
 *
 * @param {number} bookId - The ID of the book to review.
 * @param {NewReviewPayload} payload - The review content.
 * @returns {Promise<void>} - Resolves if the request is successful.
 */
export const postReview = async (
  bookId: number,
  payload: NewReviewPayload
): Promise<void> => {
  const res = await authFetch(`${API_URL}/user/books/${bookId}/review`, {
    method: "POST",
    body: JSON.stringify(payload),
  });

  if (!res.ok) {
    const error: IError = await res.json();
    throw new Error(error.message || "Erreur lors de l'envoi de l'avis");
  }
};