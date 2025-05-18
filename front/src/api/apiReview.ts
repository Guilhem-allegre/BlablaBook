import { ReviewApiResponse, NewReviewPayload, Review } from "../@types/review";
import { authFetch } from "../utils/authFetch";
import { IError } from "../@types/auth";
const API_URL = import.meta.env.VITE_API_BASE_URL;

/**
 * Post a new review or rating for a book.
 *
 * @param {number} bookId - The ID of the book to review.
 * @param {NewReviewPayload} payload - The review content.
 * @returns {Promise<void>} - Resolves if the request is successful.
 */
export const createReview = async (
  bookId: number,
  payload: NewReviewPayload
): Promise<Review> => {
  const res = await authFetch(`${API_URL}/user/books/${bookId}/review`, {
    method: "POST",
    body: JSON.stringify(payload),
  });

  if (!res.ok) {
    const error: IError = await res.json();
    throw new Error(error.message || "Erreur lors de l'envoi de l'avis");
  }

  const data = await res.json();
  return data.review;
};

/**
 * 
 * @param bookId 
 * @param payload 
 * @returns 
 */
export const updateReview = async (
  bookId: number,
  payload: NewReviewPayload
): Promise<Review> => {
  const res = await authFetch(`${API_URL}/user/books/${bookId}/review`, {
    method: "PATCH",
    body: JSON.stringify(payload),
  });

  if (!res.ok) {
    const error: IError = await res.json();
    throw new Error(error.message || "Erreur lors de la mise à jour de l'avis");
  }

  const data = await res.json();
  return data.review;
};

/**
 * 
 * @param bookId 
 * @returns 
 */
export const deleteReview = async (bookId: number): Promise<string> => {
  const res = await authFetch(`${API_URL}/user/books/${bookId}/review`, {
    method: "DELETE",
  });

  if (!res.ok) {
    const error: IError = await res.json();
    throw new Error(error.message || "Erreur lors de la suppression de l'avis");
  }

  const data = await res.json();
  return data.message; // ex: "Avis supprimé avec succès"
};

/**
 *
 * @param bookId
 * @returns
 */
export const getReviewsByBook = async (
  bookId: number
): Promise<ReviewApiResponse> => {
  const res = await authFetch(`${API_URL}/books/${bookId}/reviews`);
  if (!res.ok) {
    throw new Error("Erreur lors du chargement des avis");
  }
  return res.json();
};
