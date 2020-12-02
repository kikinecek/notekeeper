import { FileDeserialized, MidiRecordMidiFile } from "../file/types";

import { Rating, MidiRecordRating } from "../rating/types";

export interface MidiRecordInputSerialized {
  name: string;
  midi_file_id: number;
  genre?: string;
  is_public: boolean;
}

export interface MidiRecordInput {
  name: string;
  midiFileId: number;
  genre?: string;
  isPublic: boolean;
}

export interface MidiRecordSerialized extends MidiRecordRating, MidiRecordMidiFile {
  id: number;
  name: string;
  genre?: string;
  isPublic: boolean;
  viewCount: number;
  createdAt: string;
}

export interface MidiRecord {
  id: number;
  name: string;
  midiFile: FileDeserialized;
  genre?: string;
  viewCount: number;
  isPublic: boolean;
  rating: Rating;
  createdAt: Date;
}