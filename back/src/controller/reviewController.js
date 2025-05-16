import { Op } from "sequelize";
import { Review } from "../models/associations.js";
import { ApiError } from "../middlewares/ApiError.js";

const reviewController = {
  /**
   * Controller method to create a new review or rating for a book.
   *
   * @param {Object} req - The request object.
   * @param {Object} res - The response object.
   * @param {Function} next - The next middleware function.
   * @returns {Object} - The response object with the created review data.
   */
  async createReview(req, res, next) {
    const userId = req.user?.userId;
    const bookId = parseInt(req.params.bookId);
    const { rating, title, comment } = req.body;

    if (!rating && !title && !comment) {
      return next(
        new ApiError("Vous devez au moins noter ou laisser un commentaire", 400)
      );
    }

    // Object to store the results of the review creation/updating
    const reviews = {
      updatedRating: null,
      newComments: [],
    };

    // Case where user wants to add or update a rating (with or without review)
    if (rating !== undefined) {
      const existingRating = await Review.findOne({
        where: {
          book_id: bookId,
          user_id: userId,
          rating: { [Op.not]: null },
        },
      });
      if (existingRating) {
        existingRating.rating = rating;
        await existingRating.save();
        // Store the updated rating information
        reviews.updatedRating = {
          id: existingRating.id,
          rating: existingRating.rating,
          user_id: existingRating.user_id,
          book_id: existingRating.book_id,
          createdAt: existingRating.createdAt,
          updatedAt: existingRating.updatedAt,
        };
      } else {
        await Review.create({
          rating,
          book_id: bookId,
          user_id: userId,
        });
        reviews.updatedRating = {
          id: existingRating.id,
          rating: existingRating.rating,
          user_id: existingRating.user_id,
          book_id: existingRating.book_id,
          createdAt: existingRating.createdAt,
          updatedAt: existingRating.updatedAt,
        };
      }
    }

    if (title || comment) {
      const newReview = await Review.create({
        title,
        comment,
        book_id: bookId,
        user_id: userId,
      });
      reviews.newComments.push({
        id: newReview.id,
        title: newReview.title,
        comment: newReview.comment,
        user_id: newReview.user_id,
        book_id: newReview.book_id,
        createdAt: newReview.createdAt,
        updatedAt: newReview.updatedAt,
      });
    }

    res
      .status(201)
      .json({ message: "Avis ou note ajoutée avec succès", review: reviews });
  },

  /**
   * Controller method to retrieve reviews for a specific book.
   *
   * @param {Object} req - The request object.
   * @param {Object} res - The response object.
   * @param {Function} next - The next middleware function.
   * @returns {Object} - The response object with the book reviews data.
   */
  async getReviewsByBook(req, res, next) {
    const bookId = parseInt(req.params.bookId);

    const reviews = await Review.findAll({
      where: { book_id: bookId },
      include: { association: "users", attributes: ["id", "name"] },
      order: [["createdAt", "DESC"]],
    });

    if (!reviews) {
      return next(new ApiError("Aucun avis trouvés pour ce livre", 404));
    }

    const rating = reviews.find((review) => review.rating !== null);
    const comments = reviews.filter((review) => review.comment || review.title);

    res.status(200).json({
      book_id: bookId,
      rating: rating
        ? {
            id: rating.id,
            rating: rating.rating,
            user: rating.users,
            createdAt: rating.createdAt,
            updatedAt: rating.updatedAt,
          }
        : null,
      comments: comments.map((comment) => ({
        id: comment.id,
        title: comment.title,
        comment: comment.comment,
        user: comment.users,
        createdAt: comment.createdAt,
        updatedAt: comment.updatedAt,
      })),
    });
  },
};

export { reviewController };
