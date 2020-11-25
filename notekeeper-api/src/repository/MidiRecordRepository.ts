import {
  PoolConnection
} from "mysql";

import {
  query
} from "../db";

import {
  MidiRecord,
  MidiRecordInput
} from "../model/midiRecord/types";

import {
    serializeMidiRecordInput,
    deserializeMidiRecord
} from "../model/midiRecord/functions";

const storeMidiRecord = async (connection: PoolConnection, userId: number, midiRecord: MidiRecordInput): Promise<number> => {
  const inserData = serializeMidiRecordInput(midiRecord);

  const { insertId } = await query(
    connection,
    'INSERT INTO midi_record SET ?',
    inserData
  )

  return insertId;
}

const updateMidiRecord = async (connection: PoolConnection, midiRecord: MidiRecordInput): Promise<void> => {
  const insertData = serializeMidiRecordInput(midiRecord);

  await query(
    connection,
    'UPDATE midi_record SET ?',
    insertData
  )
}

const deleteMidiRecord = async (connection: PoolConnection, midiRecordId: number): Promise<void> => {
  await query(
    connection,
    'DELETE FROM midi_record WHERE midi_record_id = ?',
    [
      midiRecordId
    ]
  )
}

const findMidiRecordById = async (connection: PoolConnection, midiRecordId: number): Promise<MidiRecord> => {
  const [ result ] = await query(
    connection, 
    `
      SELECT
        mr.id AS id,
        mr.name AS name,
        mr.is_public AS isPublic,
        mr.rating AS rating,
        mr.view_count AS viewCount,
        mr.genre AS genre,
        mr.created_at AS midiFileCreatedAt,
        f.id AS midiFileId,
        f.name AS midiFileName,
        f.mime_type AS midiFileMimeType,
        f.encoding AS midiFileEncoding,
        f.size AS midiFileSize,
        f.content AS midiFileContent,
        f.created_at AS midiFileCreatedAt
      FROM midi_record mr
      JOIN file f
        ON mr.midi_file_id = f.id
      WHERE mr.id = ?
      LIMIT 1
    `,
    [
      midiRecordId
    ]
  );
  
  return deserializeMidiRecord(result);
}

const MidiRecordRepository = {
  storeMidiRecord,
  updateMidiRecord,
  deleteMidiRecord,

  findMidiRecordById
}

export default MidiRecordRepository;