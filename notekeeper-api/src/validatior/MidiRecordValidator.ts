import Joi from "joi";

export const MidiRecordInputValidationSchema = Joi.object({
  name:       Joi.string()
              .min(2)
              .max(50)
              .required(),
  midiFileId: Joi.number()
              .positive()
              .required(),
  genre:      Joi.string()
              .min(4)
              .max(64),
  isPublic:   Joi.boolean()
              .required()
});