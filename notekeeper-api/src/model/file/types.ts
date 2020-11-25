export interface FileInput {
  filename: string,
  mimetype: string,
  encoding: string
};

export interface FileInputExtended extends FileInput {
  size: number,
  content: string
}

export interface FileInputExtendedSerialized {
  name: string,
  mime_type: string,
  encoding: string,
  size: number,
  content?: string
}

export type FileDeserialized = {
  id: number,
  // creatorId: number,
  name: string,
  mimeType: string,
  encoding: string,
  size: number,
  content?: string,
  createdAt: Date,
};