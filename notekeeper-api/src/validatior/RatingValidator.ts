import Joi from "joi";

export const RatingInputValidationSchema = Joi.object({
  ratingId:   Joi.number()
              .positive()
              .required(),
  rating:     Joi.number()
              .min(1)
              .max(5)
              .required()
})