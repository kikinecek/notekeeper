import {
  FileDeserialized
} from "../file/types";

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

export interface MidiRecordSerialized {
  id: number;
  name: string;
  genre?: string;
  isPublic: boolean;
  rating: number;
  viewCount: number;
  createdAt: string;
  
  midiFileId: number;
  midiFileName: string;
  midiFileMimeType: string;
  midiFileEncoding: string;
  midiFileSize: number;
  midiFileContent?: string;
  midiFileCreatedAt: string;
}

export interface MidiRecord {
  id: number;
  name: string;
  midiFile: FileDeserialized;
  genre?: string;
  rating: number;
  viewCount: number;
  isPublic: boolean;
  createdAt: Date;
}