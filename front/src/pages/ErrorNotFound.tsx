import { Link } from "react-router-dom";

export default function ErrorNotFound() {
  return (
    <div className="bg-body flex flex-col items-center justify-center pb-4 md:pb-0">
      <h1 className="font-title text-9xl text-center font-black p-7">404</h1>
      <img
        className="w-120 mt-4 mx-auto"
        src="/img/errorPage/error404_homme.webp"
        alt="Homme avec une carte et une loupe, cherchant son chemin à côté d'une pile de livres"
      />
      <p className="font-title text-6xl text-center font-bold pt-6">Oups, page introuvable !</p>
      <p className="font-body text-2xl text-center p-6">
        On dirait que cette page s'est perdue entre deux chapitres...
      </p>
      <Link to="/" className="bg-gray-800 hover:bg-gray-700 text-white py-2 px-6 rounded mb-6 inline-block">
        Retour à l'accueil
      </Link>
    </div>
  );
}
