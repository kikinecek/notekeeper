import {
  MidiRecord,
  MidiRecordInput,
  MidiRecordSerialized,
  MidiRecordInputSerialized
} from "./types";

import { deserializeMidiRecordMidiFile } from "../file/functions";
import { deserializeMidiRecordRating } from "../rating/functions";

export const serializeMidiRecordInput = ({
  name,
  midiFileId,
  genre,
  isPublic
}: MidiRecordInput): MidiRecordInputSerialized => ({
  name,
  midi_file_id: midiFileId,
  genre,
  is_public: isPublic
})

export const deserializeMidiRecord = ({
  id,
  name,
  isPublic,
  genre,
  createdAt,
  viewCount,

  midiFileId,
  midiFileName,
  midiFileEncoding,
  midiFileMimeType,
  midiFileContent,
  midiFileCreatedAt,
  midiFileSize,
  
  ratingId,
  ratingOneStarCount,
  ratingTwoStarCount,
  ratingThreeStarCount,
  ratingFourStarCount,
  ratingFiveStarCount,
  rating,
  ratingCreatedAt
}: MidiRecordSerialized): MidiRecord => ({
  id,
  name,
  genre,
  createdAt: new Date(createdAt),
  isPublic,
  viewCount,
  midiFile: deserializeMidiRecordMidiFile({
    midiFileId,
    midiFileName,
    midiFileEncoding,
    midiFileMimeType,
    midiFileContent,
    midiFileCreatedAt,
    midiFileSize,
  }),
  rating: deserializeMidiRecordRating({
    ratingId,
    ratingOneStarCount,
    ratingTwoStarCount,
    ratingThreeStarCount,
    ratingFourStarCount,
    ratingFiveStarCount,
    rating,
    ratingCreatedAt
  })
})