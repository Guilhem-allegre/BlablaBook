import { ReviewApiResponse,NewReviewPayload } from "../@types/review";
import { authFetch } from "../utils/authFetch";
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
 * 
 * @param bookId 
 * @param payload 
 * @param token 
 */
export const postReview = async (
  bookId: number,
  payload: NewReviewPayload,
  token: string
): Promise<void> => {
  const res = await fetch(`http://localhost:3000/user/books/${bookId}/review`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${token}`, // Ton middleware auth l'exige
    },
    body: JSON.stringify(payload),
  });

  if (!res.ok) {
    const error = await res.json();
    throw new Error(error.message || "Erreur lors de l'envoi de l'avis");
  }
};