export interface UserPreview {
  id: number;
  name: string;
}

export interface Review {
  id: number;
  rating: number | null;
  title: string | null;
  comment: string | null;
  user: UserPreview;
  book_id: number;
  createdAt: string;
  updatedAt: string;
}

export interface ReviewApiResponse {
  book_id: number;
  reviews: Review[];
}

export interface NewReviewPayload {
  rating?: number;
  title?: string;
  comment?: string;
}