import { ReviewApiResponse } from "../@types/review";
import { authFetch } from "../utils/authFetch";
const API_URL = import.meta.env.VITE_API_BASE_URL;

export const getReviewsByBook = async (bookId: number): Promise<ReviewApiResponse> => {
  const res = await authFetch(`${API_URL}/books/${bookId}/reviews`);
  if (!res.ok) {
    throw new Error("Erreur lors du chargement des avis");
  }
  return res.json();
};