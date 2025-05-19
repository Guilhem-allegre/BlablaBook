import { ApiError } from "../middlewares/ApiError.js";
import { Book, User, Review } from "../models/associations.js";

const addSelectedReviews = async (req, res, next) => {
  try {
    const favoriteBooks = [20, 49, 51, 57, 58];
    const selectedBookIds = await Book.findAll();
    const user = await User.findOne();

    if (!user) {
      return next(new ApiError("Identifiant invalide", 401));
    }

    for (const bookId of selectedBookIds) {
      await Review.create({
        book_id: bookId.id,
        user_id: user.id,
        rating: Math.ceil((Math.random() * 4 + 1) * 10) / 10,
      });

      console.log(`Review ajoutée au livre ${bookId}`);
    }

    console.log("Tous les livres sélectionnées ont reçu une note !");
  } catch (error) {
    console.error("Erreur lors de l'ajout des reviews :", error);
  }
};

addSelectedReviews();
