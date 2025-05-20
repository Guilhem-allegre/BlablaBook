import { Link } from "react-router-dom";
import { IBooks } from "../@types";

type UserBookGridProps = {
  title: string;
  books: IBooks;
  linkTo?: string; // Optional route for clickable title
};

const UserBookGrid = ({ title, books, linkTo }: UserBookGridProps) => {
  return (
    <section className="content ml-[5vw] mr-[5vw] py-10">
      {linkTo ? (
        <Link to={linkTo} className="block mb-4 text-3xl font-bold font-title text-gray-800 hover:underline dark:text-placeholder" aria-label={title}>
          {title}
        </Link>
      ) : (
        <h2 className="text-3xl mb-4 font-bold font-title">{title}</h2>
      )}

      {books.length === 0 ? (
        <p className="text-lg font-body">Aucun livre trouvé.</p>
      ) : (
        <div className="grid grid-cols-1 gap-8 xxs:grid-cols-2 sm:grid-cols-3 md:grid-cols-2 ml:grid-cols-3 xl:grid-cols-5">
          {books.map((book) => {
            return (
              <Link
                key={book.id}
                to={`/books/${book.id}`}
                className="block w-60 mx-auto xxs:w-full py-2"
                aria-label={`Voir les détails du livre ${book.title}`}
              >
                <div className="book cursor-pointer hover:shadow-lg hover:rounded-md hover:transition-shadow">
                  <img
                    src={`https://images-na.ssl-images-amazon.com/images/S/compressed.photo.goodreads.com/books/${book.cover_url}.jpg`}
                    alt={book.title}
                    className="h-80 w-full object-contain mb-2 mx-auto"
                    width={160}
                    height={320}
                    loading="lazy"
                  />
                  <p className="text-center text-lg font-body [word-spacing:2px] tracking-wider ">{book.title}</p>
                </div>
              </Link>
            );
          })}
        </div>
      )}
    </section>
  );
};

export default UserBookGrid;
