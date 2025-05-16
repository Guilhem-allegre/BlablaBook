import { popularBooks } from "../data/popularBooks";
import { Link } from "react-router-dom";

const PopularBooks = () => {
  return (
    <section className="content ml-[5vw] mr-[5vw] pt-8">
      <h2 className="text-3xl mb-4 font-bold font-title">Livres populaires</h2>
      <div className="grid grid-cols-2 gap-6 sm:grid-cols-3 lg:grid-cols-5">
        {popularBooks.map((popularBook) => {
          return (
            <Link key={popularBook.id} to={`/books/${popularBook.id}`} className="block">
              <div className="book cursor-pointer hover:shadow-lg hover:rounded-md hover:transition-shadow">
                <img
                  src={`https://images-na.ssl-images-amazon.com/images/S/compressed.photo.goodreads.com/books/${popularBook.cover_url}.jpg`}
                  alt={popularBook.title}
                  className="h-80 w-full object-contain mb-2 mx-auto"
                />
                <p className="text-center text-lg font-body [word-spacing:2px] tracking-wider ">{popularBook.title}</p>
              </div>
            </Link>
          );
        })}
      </div>
    </section>
  );
};

export default PopularBooks;
