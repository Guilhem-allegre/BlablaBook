import { getRandomBooks, getTopRatedBooks } from "../api/apiBooks";
import BookGrid from "../components/BookGrid";
import PresentationPage from "../components/Presentation";
import Seo from "../components/Seo";

const baseUrl = import.meta.env.VITE_API_BASE_URL;

const HomePage = () => (
  <>
    <Seo
        title="BlablaBook - Accueil"
        description="Bienvenue sur BlablaBook, votre bibliothèque sociale."
        url={`${baseUrl}`}
      />
    <PresentationPage />
    <BookGrid title="Livres Populaires" fetchBooks={getTopRatedBooks} />
    <BookGrid title="Nos recommendations" fetchBooks={getRandomBooks} />
  </>
);

export default HomePage;
