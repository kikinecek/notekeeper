import {
  FileInputExtended,
  FileInputExtendedSerialized,
  MidiRecordMidiFile,
  FileDeserialized
} from "./types";

export const serializeFileInput = ({
  filename,
  mimetype,
  encoding,
  size,
  content
}: FileInputExtended): FileInputExtendedSerialized => ({
  name: filename,
  mime_type: mimetype,
  encoding,
  size,
  content
})

export const deserializeMidiRecordMidiFile = ({
  midiFileId,
  midiFileName,
  midiFileMimeType,
  midiFileEncoding,
  midiFileSize,
  midiFileContent,
  midiFileCreatedAt
}: MidiRecordMidiFile): FileDeserialized => ({
  id: midiFileId,
  name: midiFileName,
  mimeType: midiFileMimeType,
  encoding: midiFileEncoding,
  size: midiFileSize,
  content: midiFileContent,
  createdAt: new Date(midiFileCreatedAt)
})