import Joi from "joi";

const reviewSchema = Joi.object({
  rating: Joi.number().integer().min(0).max(5).messages({
    "number.base": `"rating" doit être un nombre`,
    "number.integer": `"rating" doit être un entier`,
    "number.min": `"rating" doit être au moins {#limit}`,
    "number.max": `"rating" doit être au plus {#limit}`,
  }),
  title: Joi.string().max(100).messages({
    "string.base": `"title" doit être une chaîne de caractères`,
    "string.max": `"title" ne doit pas dépasser {#limit} caractères`,
  }),
  comment: Joi.string().max(1000).messages({
    "string.base": `"comment" doit être une chaîne de caractères`,
    "string.max": `"comment" ne doit pas dépasser {#limit} caractères`,
  }),
});

export { reviewSchema };
