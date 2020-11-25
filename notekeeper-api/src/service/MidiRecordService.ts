import {
  connect
} from "../db";

import {
  MidiRecord,
  MidiRecordInput
} from "../model/midiRecord/types";

import {
  User
} from "../model/user/types";

import MidiRecordRepository from "../repository/MidiRecordRepository";

const storeMidiRecord = async (midiRecord: MidiRecordInput, user: User): Promise<MidiRecord> => 
  await connect(async (connection) => {
    try {
      const midiRecordId = await MidiRecordRepository.storeMidiRecord(connection, user.id, midiRecord)
  
      return await MidiRecordRepository.findMidiRecordById(connection, midiRecordId);
    } catch (err) {
      console.log(err);

      throw err;
    }
  })

const updateMidiRecord = async (midiRecord: MidiRecordInput, user: User) => 
  await connect(async (connection) => {
    await MidiRecordRepository.updateMidiRecord(connection, midiRecord);
  })

const deleteMidiRecord = async (midiRecordId: number, user: User) => 
  await connect(async (connection) => {
    await MidiRecordRepository.deleteMidiRecord(connection, midiRecordId)
  })

const MidiRecordService = {
  storeMidiRecord,
  updateMidiRecord,
  deleteMidiRecord
}

export default MidiRecordService;