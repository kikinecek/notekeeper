import {
  FileDeserialized,
  FileInputExtended,
  FileInputExtendedSerialized
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