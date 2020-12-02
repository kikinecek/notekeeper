import { MidiRecordRating, Rating } from "./types";

export const deserializeMidiRecordRating = ({
  ratingId,
  ratingOneStarCount,
  ratingTwoStarCount,
  ratingThreeStarCount,
  ratingFourStarCount,
  ratingFiveStarCount,
  rating,
  ratingCreatedAt
}: MidiRecordRating): Rating => ({
  id: ratingId,
  oneStarCount: ratingOneStarCount,
  twoStarCount: ratingTwoStarCount,
  threeStarCount: ratingThreeStarCount,
  fourStarCount: ratingFourStarCount,
  fiveStarCount: ratingFiveStarCount,
  rating,
  createdAt: new Date(ratingCreatedAt)
})