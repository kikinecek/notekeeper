import Joi from "joi";

const aphabeticalRegex = '/^[a-zA-Z]*$/'

export const UserSignUpValidationSchema = Joi.object({
  email:      Joi.string()
              .email()
              .trim()
              .lowercase()
              .required(),
  firstName:  Joi.string()
              .min(2)
              .max(20)
              .regex(new RegExp(aphabeticalRegex)), 
  lastName:   Joi.string()
              .min(2)
              .max(20)
              .regex(new RegExp(aphabeticalRegex)),
  password:   Joi.string()
              .min(6)
              .max(25)
              .required() 
});

export const UserSignInValidationSchema = Joi.object({
  email:      Joi.string()
              .email()
              .trim()
              .lowercase()
              .required(),
  password:   Joi.string()
              .required() 
});