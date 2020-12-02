import Joi from "joi";

const aphabeticalRegex = '/^[a-zA-Z]*$/'

export const UserInputValidationSchema = Joi.object({
  id:          Joi.number()
              .positive()
              .required(),
  firstName:  Joi.string()
              .min(2)
              .max(20)
              .regex(new RegExp(aphabeticalRegex)), 
  lastName:   Joi.string()
              .min(2)
              .max(20)
              .regex(new RegExp(aphabeticalRegex)),
  email:      Joi.string()
              .email()
              .required(),    
}) 