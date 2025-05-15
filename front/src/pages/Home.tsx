import { getTopRatedBooks } from "../api/apiBooks";
import BookGrid from "../components/BookGrid";
import PresentationPage from "../components/Presentation";
import RecommendedBooks from "../components/RecommendedBooks";

const HomePage = () => (
  <>
    <PresentationPage />
    <BookGrid title="Livres Populaires" fetchBooks={getTopRatedBooks} />
    <RecommendedBooks />
  </>
);

export default HomePage;
