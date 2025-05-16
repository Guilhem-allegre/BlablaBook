import Joi from "joi";

const reviewSchema = Joi.object({
  rating: Joi.number().integer().min(0).max(5),
  title: Joi.string().max(100),
  comment: Joi.string().max(1000),
});

export { reviewSchema };