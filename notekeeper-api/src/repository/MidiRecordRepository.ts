import { PoolConnection } from "mysql";

import { query } from "../db";

import {
  MidiRecord,
  MidiRecordInput
} from "../model/midiRecord/types";

import {
    serializeMidiRecordInput,
    deserializeMidiRecord
} from "../model/midiRecord/functions";

import * as FileRepository from "./FileRepository";

export const storeMidiRecord = async (
  connection: PoolConnection,
  userId: number,
  midiRecord: MidiRecordInput,
  ratingId: number
): Promise<number> => {
  const insertData = {
    ...serializeMidiRecordInput(midiRecord),
    rating_id: ratingId
  }

  const { insertId } = await query(
    connection,
    'INSERT INTO midi_record SET ?',
    insertData
  )

  return insertId;
}

export const updateMidiRecord = async (
  connection: PoolConnection,
  midiRecordId: number,
  {
    name,
    midiFileId,
    genre,
    isPublic
  }: MidiRecordInput
): Promise<void> => {
  await query(
    connection,
    `
      UPDATE midi_record
      SET
        name = ?,
        midi_file_id = ?,
        genre = ?,
        is_public = ?
      WHERE ?
      `,
      [
        name,
        midiFileId,
        genre,
        isPublic,
        midiRecordId
      ]
  )
}

export const deleteMidiRecord = async (connection: PoolConnection, midiRecordId: number): Promise<void> => {
  const [{ midiFileId }] = await query(
    connection,
    `
      SELECT midi_file_id AS midiFileId
      FROM midi_record
      WHERE id = ?
    `,
    [
      midiRecordId
    ]
  )
  
  await query(
    connection,
    'DELETE FROM midi_record WHERE id = ?',
    [
      midiRecordId
    ]
  )

  await FileRepository.deleteFile(connection, midiFileId);
}

export const findMidiRecordById = async (connection: PoolConnection, midiRecordId: number): Promise<MidiRecord> => {
  const [ result ] = await query(
    connection, 
    `
      SELECT *
      FROM MidiRecords
      WHERE id = ?
      LIMIT 1
    `,
    [
      midiRecordId
    ]
  );
  
  return deserializeMidiRecord(result);
}