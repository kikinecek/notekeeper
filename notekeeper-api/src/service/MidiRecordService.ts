import { connect } from "../db";

import {
  MidiRecord,
  MidiRecordInput
} from "../model/midiRecord/types";

import { User } from "../model/user/types";

import * as RatingRepository from "../repository/RatingRepository";
import * as MidiRecordRepository from "../repository/MidiRecordRepository";

export const storeMidiRecord = async (user: User, midiRecord: MidiRecordInput): Promise<MidiRecord> => 
  await connect(async (connection) => {
    try {
      const ratingId = await RatingRepository.initializeRating(connection);

      const midiRecordId = await MidiRecordRepository.storeMidiRecord(connection, user.id, midiRecord, ratingId);
  
      return await MidiRecordRepository.findMidiRecordById(connection, midiRecordId);
    } catch (err) {
      console.log(err);

      throw err;
    }
  })

export const updateMidiRecord = async (user: User, midiRecordId: number, midiRecord: MidiRecordInput) => 
  await connect(async (connection) => {
    try {
      await MidiRecordRepository.updateMidiRecord(connection, midiRecordId, midiRecord);

      return await MidiRecordRepository.findMidiRecordById(connection, midiRecordId);
    } catch (err) {

    }
  })

export const deleteMidiRecord = async (midiRecordId: number, user: User) => 
  await connect(async (connection) => {
    await MidiRecordRepository.deleteMidiRecord(connection, midiRecordId)
  })

export const updateMidiRecordRating = async (user: User, ratingId: number, rating: number) => 
  await connect(async (connection) => {
    await RatingRepository.updateRating(connection, ratingId, rating);

    return await RatingRepository.findRatingById(connection, ratingId);
  })