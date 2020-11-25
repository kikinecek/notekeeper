import {
  MidiRecord,
  MidiRecordInput,
  MidiRecordSerialized,
  MidiRecordInputSerialized
} from "./types";


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
  rating,
  viewCount,
  midiFileId,
  midiFileName,
  midiFileEncoding,
  midiFileMimeType,
  midiFileContent,
  midiFileCreatedAt,
  midiFileSize
}: MidiRecordSerialized): MidiRecord => ({
  id,
  name,
  genre,
  createdAt: new Date(createdAt),
  isPublic,
  rating,
  viewCount,
  midiFile: {
    id: midiFileId,
    name: midiFileName,
    encoding: midiFileEncoding,
    mimeType: midiFileMimeType,
    content: midiFileContent,
    createdAt: new Date(midiFileCreatedAt),
    size: midiFileSize
  }
})