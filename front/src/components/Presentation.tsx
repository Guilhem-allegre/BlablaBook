import { Link } from "react-router-dom";
import { useAuthStore } from "../utils/store/useAuthStore";

const PresentationPage = () => {
  const { user, token } = useAuthStore();
  const isAuthenticated = !!user && !!token;

  return (
    <>
      <section className="py-12 font-body px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl font-title font-extrabold text-gray-900 mb-4">Bienvenue sur BlaBlaBook</h2>
          <p className="text-lg text-gray-700 leading-relaxed">
            BlaBlaBook est une plateforme communautaire dédiée aux passionnés de lecture. Ici, vous pouvez explorer une
            large sélection de livres, noter ceux que vous avez lus, sauvegarder ceux que vous souhaitez lire, et
            surtout... partager vos avis avec d'autres lecteurs !
          </p>
          <p className="text-lg text-gray-700 leading-relaxed mt-4">
            Que vous soyez fan de fantasy, amateur de romans policiers ou curieux de découvertes littéraires, notre
            bibliothèque s’adapte à tous les goûts. Rejoignez la communauté, échangez autour des livres, et ne laissez
            jamais un bon livre sans un bon avis.
          </p>
        </div>
        <div className="mt-8 flex justify-center gap-4">
          <Link
            to="/library"
            className="rounded px-6 py-4 bg-gray-800 font-semibold text-lg text-white text-center shadow-sm transition-all duration-300 hover:bg-gray-600 hover:shadow-gray-400 cursor-pointer"
            aria-label="Explorer la bibliothèque"
          >
            Explorer la bibliothèque
          </Link>
          {!isAuthenticated ? (
            <Link
              to="/auth"
              className="rounded px-6 py-4 bg-white font-semibold text-lg text-gray-700 text-center shadow-sm transition-all duration-300 hover:bg-gray-300 hover:shadow-gray-400 cursor-pointer"
              aria-label="Se connecter ou s'inscrire"
            >
              Se connecter / S'inscrire
            </Link>
          ) : (
            <Link
              to="/profile"
              className="rounded px-6 py-4 bg-white font-semibold text-lg text-gray-700 text-center shadow-sm transition-all duration-300 hover:bg-gray-300 hover:shadow-gray-400 cursor-pointer"
              aria-label="Voir mon profil"
            >
              Voir mon profil
            </Link>
          )}
        </div>
      </section>
    </>
  );
};

export default PresentationPage;
