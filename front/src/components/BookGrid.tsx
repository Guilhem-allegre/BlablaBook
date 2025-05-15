import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { IBooks } from "../@types";

type BookGridProps = {
  title: string;
  fetchBooks: () => Promise<IBooks>;
};

const BookGrid = ({ title, fetchBooks }: BookGridProps) => {
  const [bookList, setBookList] = useState<IBooks>([]);
  useEffect(() => {
    async function loadBooks() {
      try {
        const data = await fetchBooks();
        setBookList(data);
      } catch (error) {
        console.log(error);
      }
    }
    loadBooks();
  }, []);
  return (
    <section className="content ml-[5vw] mr-[5vw] pt-8">
      <h2 className="text-3xl mb-4 font-bold font-title">{title}</h2>
      <div className="grid grid-cols-2 gap-6 sm:grid-cols-3 lg:grid-cols-5">
        {bookList.map((book) => {
          return (
            <Link key={book.id} to={`/books/${book.id}`} className="block">
              <div className="book cursor-pointer hover:shadow-lg hover:rounded-md hover:transition-shadow">
                <img
                  src={`https://images-na.ssl-images-amazon.com/images/S/compressed.photo.goodreads.com/books/${book.cover_url}.jpg`}
                  alt={book.title}
                  className="h-80 w-full object-contain mb-2 mx-auto"
                />
                <p className="text-center text-lg font-body [word-spacing:2px] tracking-wider ">{book.title}</p>
              </div>
            </Link>
          );
        })}
      </div>
    </section>
  );
};

export default BookGrid;
