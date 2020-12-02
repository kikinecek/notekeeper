export interface Rating {
  id: number;
  oneStarCount: number;
  twoStarCount: number;
  threeStarCount: number;
  fourStarCount: number;
  fiveStarCount: number;
  rating: number;
  createdAt: Date
};


export interface MidiRecordRating {
  ratingId: number;
  ratingOneStarCount: number;
  ratingTwoStarCount: number;
  ratingThreeStarCount: number;
  ratingFourStarCount: number;
  ratingFiveStarCount: number;
  rating: number;
  ratingCreatedAt: string;
};