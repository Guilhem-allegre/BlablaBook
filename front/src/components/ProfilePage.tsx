import { useEffect, useState } from "react";
import { getOneUser } from "../api/apiUser";
import { IUser } from "../@types";
import { Link } from "react-router-dom";
import { useAuthStore } from "../utils/store/useAuthStore";
import UserBookGrid from "../components/UserBookGrid";

const ProfilePage = () => {
  // Local state to hold the fetched user data
  const [localUser, setLocalUser] = useState<IUser | null>(null);

  // State for loading and error handling
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Get the authenticated user from the global auth store
  const { user } = useAuthStore();

  // Fetch user profile data on component mount
  useEffect(() => {
    async function fetchUser() {
      if (!user?.id) {
        // If user is not logged in, set an error message
        setError("Utilisateur non connecté");
        setLoading(false);
        return;
      }

      try {
        // Fetch user profile from the API
        const userData = await getOneUser();
        setLocalUser(userData);
      } catch (err) {
        // Set an error message if fetching fails
        setError("Impossible de charger le profil.");
      } finally {
        // Stop loading spinner
        setLoading(false);
      }
    }

    fetchUser();
  }, []);

  // Conditional UI rendering for loading and error states
  if (loading) return <p className="text-center">Chargement de votre profil...</p>;
  if (error) return <p className="text-center text-red-500">{error}</p>;
  if (!localUser) return null;

  return (
    <div className="pt-8 content ml-[5vw] mr-[5vw] pb-10 md:pb-8">
      {/* Header: user name and profile settings button */}
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-4xl font-bold font-title">{user?.name}</h1>
        <Link
          to={`/user/settings`}
          className="bg-gray-800 text-white px-4 py-2 rounded hover:bg-gray-600 dark:bg-gray-600 dark:hover:bg-gray-400"
          aria-label="Modifier le profil"
        >
          Modifier le profil
        </Link>
      </div>

      {/* Display recently read books (limited to 5) */}
      <UserBookGrid
  title={`Mes livres lus : ${localUser.books_already_read.length}`}
  books={localUser.books_already_read.slice(0, 5)}
  linkTo="/books/read"
/>

<UserBookGrid
  title={`Mes livres à lire : ${localUser.books_wish_read.length}`}
  books={localUser.books_wish_read.slice(0, 5)}
  linkTo="/books/to-read"
/>

    </div>
  );
};

export default ProfilePage;
