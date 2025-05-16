export interface Review {
  id: number;
  rating: number | null;
  title: string | null;
  comment: string | null;
  user: {
    id: number;
    name: string;
  };
  book_id: number;
  createdAt: string;
  updatedAt: string;
}

export interface ReviewApiResponse {
  book_id: number;
  rating: {
    id: number;
    rating: number;
    user: {
      id: number;
      name: string;
    };
    createdAt: string;
    updatedAt: string;
  } | null;
  comments: Review[];
}
